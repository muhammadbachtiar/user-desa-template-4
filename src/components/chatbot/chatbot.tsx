"use client"

import dynamic from 'next/dynamic';

const BubbleChat = dynamic(() => import('flowise-embed-react').then(mod => mod.BubbleChat), { ssr: false });


const Chatbot = () => {

  return (
     <BubbleChat
            chatflowid={process.env.NEXT_PUBLIC_CHATBOT_ID ?? ''}
            apiHost={process.env.NEXT_PUBLIC_CHATBOT_BASE_URL ?? ''}
             theme={{    
                button: {
                    backgroundColor: '#3B81F6',
                    right: 20,
                    bottom: 70,
                    size: 48,
                    dragAndDrop: true,
                    iconColor: 'white',
                    autoWindowOpen: {
                        autoOpen: true,
                        openDelay: 2,
                        autoOpenOnMobile: false
                    }
                },
                disclaimer: {
                    title: 'Disclaimer',
                    message: "Dengan menggunaknan chatbot ini, kamu menyetujui <a target=\"_blank\" href=\"https://flowiseai.com/terms\">syarat dan ketentuan</a>",
                    textColor: 'black',
                    buttonColor: '#3b82f6',
                    buttonText: 'Mulai percakapan',
                    buttonTextColor: 'white',
                    denyButtonText: 'Tutup',
                    blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backgroundColor: 'white'
                },
                customCSS: ``,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
                    title: 'Aruna',
                    titleAvatarSrc: '/images/aruna-profile.png',
                    welcomeMessage: 'Hallo saya aruna, asisten virtual anda. Silahkan bertanya kepada saya.',
                    errorMessage: 'This is a custom error message',
                    backgroundColor: '#ffffff',
                    backgroundImage: 'enter image path or link',
                    width: 400,
                    fontSize: 16,
                    starterPrompts: [
                        "Apa yang bisa kamu lakukan?",
                        "Kamu siapa?",
                    ],
                    starterPromptFontSize: 15,
                    clearChatOnReload: false,
                    sourceDocsTitle: 'Sources:',
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: '#f7f8ff',
                        textColor: '#303235',
                        showAvatar: true,
                        avatarSrc: '/images/aruna-profile.png'
                    },
                    userMessage: {
                        backgroundColor: '#3B81F6',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
                    },
                    textInput: {
                        placeholder: 'Apa pertanyaan anda?',
                        backgroundColor: '#ffffff',
                        textColor: '#303235',
                        sendButtonColor: '#3B81F6',
                        maxChars: 50,
                        maxCharsWarningMessage: 'Batas karakter 50',
                        autoFocus: true,
                        sendMessageSound: true,
                        sendSoundLocation: 'send_message.mp3',
                        receiveMessageSound: true,
                        receiveSoundLocation: 'receive_message.mp3'
                    },
                    feedback: {
                        color: '#303235'
                    },
                    dateTimeToggle: {
                        date: true,
                        time: true
                    },
                    footer: {
                        textColor: '#303235',
                        text: 'Aruna MEMBARA - Asisten Virtual',
                        company: 'Muara Enim',
                        companyLink: 'https://muaraenimkab.go.id/'
                    }
                }
            }}
        />
  )
}

export default Chatbot
