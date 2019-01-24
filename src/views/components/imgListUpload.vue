<template>
  <div>
    <el-upload
      :action="pAction"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove"
      :headers="{token}"
      :limit="6"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import { getToken } from '@/utils/auth'
  export default {
    props: ['uuid', 'pSize', 'pImgUrl', 'pAction', 'pSizeData', 'pWidth', 'pHeight'],
    data() {
      return {
        imgType: ['image/jpeg', 'image/png', 'image/bmp'],
        dialogImageUrl: '',
        dialogVisible: false,
        baseUrl: process.env.BASE_API,
        fileList: [],
        token: getToken()
      }
    },
    methods: {
      handleRemove(file, fileList) {
        const arr = []
        for (const i in fileList) {
          arr.push(fileList[i].response.data.url)
        }
        this.$emit('listenToChildListUrl', arr)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess(res, file, fileList) { // 成功时将Url发送回父组件
        const arr = []
        for (const i in fileList) {
          arr.push(fileList[i].response.data.url)
        }
        this.$emit('listenToChildListUrl', arr)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制上传 6 个文件，本次上传了 ${files.length} 个文件，如需上传请先删除旧文件`)
      },
      beforeAvatarUpload(file) {
        let typeFlag = false
        for (const o in this.imgType) {
          if (this.imgType[o] === file.type) {
            typeFlag = true
          }
        }
        const isLt1M = file.size / 1024 / 1024 < (this.pSizeData - 0)
        if (!typeFlag) {
          this.$message.error('上传图片只能是 ' + this.imgType + ' 格式!')
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
          this.$message.error('上传的尺寸必须是宽度:' + _width + 'px 高度:' + _height + 'px')
          return Promise.reject()
        })
        return typeFlag && isLt1M && isSize
      }
    }
  }
</script>
