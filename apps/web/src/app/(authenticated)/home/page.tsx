'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Input,
  Button,
  Row,
  Col,
  List,
  Avatar,
  Card,
  Space,
} from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  SendOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [videoUrl, setVideoUrl] = useState('')
  const [video, setVideo] = useState<Model.Video | null>(null)
  const [chatMessages, setChatMessages] = useState<Model.ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isHost, setIsHost] = useState(false)
  const [discussionOpen, setDiscussionOpen] = useState(false)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['videosAsHost'] }).then(user => {
        setIsHost(user.videosAsHost?.length > 0)
      })
    }
  }, [userId])

  const handleVideoSubmit = async () => {
    if (userId && videoUrl) {
      try {
        const newVideo = await Api.Video.createOneByHostId(userId, {
          url: videoUrl,
        })
        setVideo(newVideo)
        enqueueSnackbar('Video added successfully!', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to add video.', { variant: 'error' })
      }
    }
  }

  const handlePlaybackControl = async (action: string) => {
    if (video?.id) {
      try {
        await Api.PlaybackControl.createOneByVideoId(video.id, {
          action,
          timestamp: dayjs().toISOString(),
        })
        if (action === 'pause') {
          setDiscussionOpen(true)
        } else {
          setDiscussionOpen(false)
        }
        enqueueSnackbar(`Video ${action}ed successfully!`, {
          variant: 'success',
        })
      } catch (error) {
        enqueueSnackbar(`Failed to ${action} video.`, { variant: 'error' })
      }
    }
  }

  const handleSendMessage = async () => {
    if (video?.id && newMessage) {
      try {
        const message = await Api.ChatMessage.createOneByVideoId(video.id, {
          message: newMessage,
          timestamp: dayjs().toISOString(),
          userId,
        })
        setChatMessages([...chatMessages, message])
        setNewMessage('')
        enqueueSnackbar('Message sent successfully!', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to send message.', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Collaborative Video Learning</Title>
      <Paragraph>
        Paste a YouTube link to host a video and control playback for all
        participants. Engage in live chat and discussions.
      </Paragraph>

      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="Paste YouTube link here"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            onPressEnter={handleVideoSubmit}
            disabled={isHost}
          />
          <Button type="primary" onClick={handleVideoSubmit} disabled={isHost}>
            Host Video
          </Button>
        </Col>

        {video && (
          <Col span={24}>
            <Card title="Video Controls">
              <Space>
                <Button
                  icon={<PlayCircleOutlined />}
                  onClick={() => handlePlaybackControl('play')}
                >
                  Play
                </Button>
                <Button
                  icon={<PauseCircleOutlined />}
                  onClick={() => handlePlaybackControl('pause')}
                >
                  Pause
                </Button>
                <Button
                  icon={<StopOutlined />}
                  onClick={() => handlePlaybackControl('stop')}
                >
                  Stop
                </Button>
              </Space>
            </Card>
          </Col>
        )}

        <Col span={24}>
          <Card title="Live Chat">
            <List
              dataSource={chatMessages}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.user?.pictureUrl} />}
                    title={item.user?.name}
                    description={item.message}
                  />
                </List.Item>
              )}
            />
            <TextArea
              rows={4}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onPressEnter={handleSendMessage}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Card>
        </Col>

        {discussionOpen && (
          <Col span={24}>
            <Card title="Discussion">
              <Paragraph>
                Discuss and resolve issues or questions here.
              </Paragraph>
              {/* Discussion content goes here */}
            </Card>
          </Col>
        )}
      </Row>
    </PageLayout>
  )
}
