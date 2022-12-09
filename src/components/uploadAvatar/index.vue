<template>
  <a-upload
    :accept="accept"
    :before-upload="beforeUpload"
    v-model:file-list="defFileList"
    @change="handleChange"
    list-type="picture-card"
    :maxCount="1"
    :show-upload-list="false"
  >
    <close-outlined class="close-icon" v-if="imgUrl" @click.stop="removeImg" />
    <img :src="imgUrl" alt="" v-if="imgUrl" v-bind="imgWH" />
    <icon-eps-upload-image v-bind="iconWH" v-else />
  </a-upload>
  <slot>
    <div class="tip">{{ `${tip}, 且不超过${maxSize}M` }}</div>
  </slot>
</template>

<script setup lang="ts" name="uploadAvatar">
import { ref, watch } from 'vue';
import { getBase64 } from './index';
import { message, UploadProps } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
const props = withDefaults(
  defineProps<{
    fileList: any[];
    imgUrl: string;
    imgWH?: {
      width: number;
      height: number;
    };
    iconWH?: {
      width: string;
      height: string;
    };
    typeList?: string[];
    tip?: string;
    maxSize?: number;
    accept?: string;
  }>(),
  {
    imgWH: () => ({
      width: 100,
      height: 100
    }),
    iconWH: () => ({
      width: '40px',
      height: '30px'
    }),
    typeList: () => ['image/png', 'image/jpg', 'image/jpeg'],
    tip: '上传图片格式只能是PNG、JPEG、JGP',
    maxSize: 1,
    accept: '.png,.jpg,.jpeg'
  }
);
const emit = defineEmits(['update:imgUrl', 'update:fileList']);

const defFileList = ref<any[]>([]);
watch(
  () => props.fileList,
  (val: any[]) => {
    defFileList.value = val;
  },
  {
    immediate: true,
    deep: true
  }
);
const beforeUpload: UploadProps['beforeUpload'] = () => {
  return false;
};
const handleChange = async ({ file, fileList }: any) => {
  const isLt1M = file.size / 1024 / 1024 < props.maxSize;
  if (!isLt1M) {
    defFileList.value = [];
    message.warning(`上传图片大小不能超过 ${props.maxSize}M!`);
    return;
  }
  if (!props.typeList.includes(file.type)) {
    message.warning(props.tip);
    setTimeout(() => {
      defFileList.value = [];
    }, 500);
    return;
  }
  const url = await getBase64(fileList[0].originFileObj);
  emit('update:imgUrl', url);
  emit('update:fileList', fileList);
};
const removeImg = () => {
  emit('update:imgUrl', '');
  emit('update:fileList', []);
};
</script>

<style lang="scss" scoped>
.ant-upload-picture-card-wrapper {
  :deep(.ant-upload) {
    position: relative;
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #f81d22;
    }
  }
}
</style>
