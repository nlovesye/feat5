// import services from '@/services/demo';
import { UploadOutlined } from '@ant-design/icons';
import {
  PageContainer,
  // ActionType,
  // FooterToolbar,
  // ProDescriptions,
  // ProDescriptionsItemProps,
  // ProTable,
} from '@ant-design/pro-components';
import { Button, Upload, UploadProps } from 'antd';
import { useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
// import { Button, Divider, Drawer, message } from 'antd';
// import React, { useRef, useState } from 'react';
// import CreateForm from './components/CreateForm';
// import UpdateForm, { FormValueType } from './components/UpdateForm';
import styles from './index.less';
import { useCallback } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

const uploadProps: UploadProps = {
  name: 'file',
  accept:
    '.mp4,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav,video/webm,video/ogg,application/ogg',
  // multiple: true,
  action: 'http://10.0.2.94:7700/api/upload',
  method: 'post',
  headers: {
    authorization: 'authorization-text',
  },
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};

const Player: React.FC<unknown> = () => {
  const [url, setUrl] = useState<ReactPlayerProps['url']>(
    'http://10.0.2.94:7700/video/kb01/xxx.m3u8',
  );

  const onChange = useCallback((info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;
    if (file.status === 'done') {
      console.log('file', file);

      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target?.result;
        console.log('1', data, event, reader);
        if (data) {
          console.log('x', file, event);
          setUrl(data as string);
        }
      };

      if (file.originFileObj) {
        // reader.readAsDataURL(file.originFileObj);
        // setUrl(file.originFileObj as any);
      }
      // const newStream = new MediaStream();
    }
  }, []);

  return (
    <PageContainer
      header={{
        title: '视频播放器',
      }}
    >
      <Upload {...uploadProps} onChange={onChange}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <div className={styles['player-wrapper']}>
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          playing
          controls
          // kernel="native"
        />
      </div>
    </PageContainer>
  );
};

export default Player;
