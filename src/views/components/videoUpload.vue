<template>
  <div style="text-align: left">
    <el-upload
      class="upload-demo"
      :action="pAction"
      :limit="1"
      :headers="{token}"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <el-button size="small" class="noloOrangeBtn" type="primary">点击上传</el-button>
    </el-upload>
    <!--{token}等同于{token:token}-->
    <video :src="videoUrl" v-if="videoUrl !== ''" controls></video>
    <div style="color: #E6A23C;">推荐尺寸：{{pSize}}，不大于100M</div>
  </div>
</template>


<script>
  import { getToken } from '@/utils/auth'
  
  export default {
    props: ['pSize', 'pVideoUrl', 'pType', 'pAction'],
    data() {
      return {
        filterType: [],
        videoUrl: '',
        fileList: [],
        token: getToken()
      }
    },
    watch: {
      pVideoUrl: function() {
        this.fileList.length = 0
        this.fileList.push(this.pVideoUrl)
        this.videoUrl = this.pVideoUrl.url
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // this.cardIdUrl = URL.createObjectURL(file.raw)
        this.videoUrl = res.data.url
        this.$emit('listenToChildVideoUrl', file.response.data.url)
      },
      beforeAvatarUpload(file) {
        let typeFlag = false
        const isLt1M = file.size / 1024 / 1024 < 100
        if (file.type === 'video/mp4') typeFlag = true
        if (!typeFlag) {
          this.$message.error('上传图片只能是 ' + 'mp4' + ' 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传视频大小不超过 100MB')
        }
        return typeFlag && isLt1M
      },
      handleRemove(file, fileList) {
        this.fileList.length = 0
        this.videoUrl = ''
        this.$emit('listenToChildVideoUrl', '')
      }
    },
    computed: {}
  }
</script>
<style>
</style>
