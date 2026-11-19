import { createSlice } from "@reduxjs/toolkit";

const initialChatHisto = [
  {
    content: "Bonjour ! Comment puis-je vous aider dans votre projet ?",
    contentEng: "Hello! How can I help you with your project?",
    sender: "pierre",
    blocks: [
      {
        type: "text",
        text: "Bonjour ! Comment puis-je vous aider dans votre projet ?",
      },
      {
        label: "un lien",
        url: "https://calendly.com/l-araignee/entretien-en-visio",
        sender: "pierre",
        type: "link",
      },
    ],
  },
];

export const userSlice = createSlice({
  name: "Token",
  initialState: {
    token: null,
    projects: [],
    translations: null,
    skills: [],
    tools: [],
    sliders: [],
    likes: null,
    language: "FR",
    contactMenu: false,
    chatbotMood: "normal",
    conversationId: null,
    chatHisto: initialChatHisto,
  },
  reducers: {
    setToken: (currentState, action) => {
      return { ...currentState, token: action.payload };
    },

    setProjects: (currentState, action) => {
      return { ...currentState, projects: action.payload };
    },

    setTranslations: (currentState, action) => {
      return { ...currentState, translations: action.payload };
    },

    setSkills: (currentState, action) => {
      return { ...currentState, skills: action.payload };
    },

    setTools: (currentState, action) => {
      return { ...currentState, tools: action.payload };
    },

    setSliders: (currentState, action) => {
      return { ...currentState, sliders: action.payload };
    },

    setLikes: (currentState, action) => {
      return { ...currentState, likes: action.payload };
    },

    setLanguage: (currentState, action) => {
      return { ...currentState, language: action.payload };
    },

    setContactMenu: (currentState, action) => {
      return { ...currentState, contactMenu: action.payload };
    },

    updateLike: (currentState, action) => {
      const updatedLikes = currentState.likes
        ? currentState.likes.map((like) => {
            if (like._id === action.payload.id) {
              return { ...like, likes: action.payload.likes };
            }
            return like;
          })
        : [];

      return { ...currentState, likes: updatedLikes };
    },

    setChatbotMood: (currentState, action) => {
      return { ...currentState, chatbotMood: action.payload };
    },

    setConversationId: (currentState, action) => {
      return { ...currentState, conversationId: action.payload };
    },

    addChatMessage: (currentState, action) => {
      return {
        ...currentState,
        chatHisto: [...currentState.chatHisto, action.payload],
      };
    },

    resetChat: (currentState) => {
      return {
        ...currentState,
        conversationId: null,
        chatHisto: initialChatHisto,
      };
    },
  },
});
