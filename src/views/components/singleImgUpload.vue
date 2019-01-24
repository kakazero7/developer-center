<template>
  <div>
    <el-upload class="avatar-uploader"
               :action="pAction"
               :headers="{token}"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
      <img v-if="cardIdUrl" :src="cardIdUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="color: #E6A23C;">{{$t('RegisterInformation.single_Choice_Size')}}{{pSize}}</div>
  </div>
</template>


<script>
  import { getToken } from '@/utils/auth'
  export default {
    props: ['uuid', 'pSize', 'pSizeData', 'pImgUrl', 'pType', 'pAction', 'pWidth', 'pHeight'],
    data() {
      return {
        imgType: ['image/jpeg', 'image/png', 'image/bmp'],
        filterType: [],
        cardIdUrl: '',
        token: getToken()
      }
    },
    created() {
      // this.fetchData()
    },
    watch: {
      pImgUrl: function() {
        this.cardIdUrl = this.pImgUrl
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // this.cardIdUrl = URL.createObjectURL(file.raw)
        this.cardIdUrl = res.data.url
        this.$emit('listenToChildSingleUrl', file.response.data.url)
      },
      beforeAvatarUpload(file) {
        this.filterType = []
        if (this.pType) { // 判断父组件传过来的可上传图片类型
          const typeArr = this.pType
          for (const i in typeArr) {
            this.filterType.push(this.imgType[typeArr[i]])
          }
        } else { // 如果没有直接赋值为默认
          this.filterType = this.imgType
        }
        let typeFlag = false
        for (const o in this.filterType) {
          if (this.filterType[o] === file.type) {
            typeFlag = true
          }
        }
        const isLt1M = file.size / 1024 / 1024 < (this.pSizeData - 0)
        if (!typeFlag) {
          this.$message.error('上传图片只能是 ' + this.filterType + ' 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不超过 ' + this.pSizeData + 'MB')
        }
        const _width = this.pWidth
        const _height = this.pHeight
        const isSize = new Promise(function(resolve, reject) {
          const _url = URL.createObjectURL(file)
          const img = new Image()
          if (_width !== undefined && _height !== undefined) { // 是否判断宽高
            img.onload = function() {
              const valid = img.width === _width && img.height === _height
              valid ? resolve() : reject()
            }
          } else {
            resolve()
          }
          img.src = _url
        }).then(() => {
          return true
        }, () => {
          this.$message.error('上传尺寸必须为宽度:' + _width + 'px 高度:' + _height + 'px')
          return Promise.reject()
        })
        return typeFlag && isLt1M && isSize
      }
    },
    computed: {}
  }
</script>

<style>
  .avatar {
    width: 178px;
    height: auto;
    display: block;
  }
  
  .avatar-uploader-icon {
    line-height: 178px;
  }
</style>
