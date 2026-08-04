import { useMemo, useState } from "react";
import Sidebarcomponent from "../components/Sidebar.component";
import Topbarcomponent from "../components/Topbar.component";
import Footer from "../components/Footer.component";
import SearchComponent from "../components/search.component";
import "../styles/communications.styles.css";

const initialConversations = [
  {
    id: "musoke-robert",
    name: "Musoke Robert",
    initials: "MR",
    accent: "avatar-blue",
    group: "Senior 4 Parents Association",
    role: "Parent",
    online: true,
    unread: 2,
    lastActive: "10:45 AM",
    preview: "Dear Admin, has the final draft for the Term 2 Exam Papers been uploaded to the portal?",
    messages: [
      { id: 1, sender: "incoming", text: "Dear Admin, has the final draft for the Term 2 Exam Papers been uploaded to the portal? Several parents are asking for the revision schedule.", time: "10:45 AM" },
      { id: 2, sender: "outgoing", text: "Hello Musoke. Yes, the papers were uploaded this morning. You can find them under the 'Academic' tab in the 'Resources' folder.", time: "10:22 AM" },
      { id: 3, sender: "incoming", text: "Please confirm the Sports Day Logistics for Friday.", time: "10:15 AM" },
      { id: 4, sender: "document", title: "Sports_Day_Agenda_2024.pdf", meta: "1.2 MB • PDF Document" },
    ],
  },
  {
    id: "okello-david",
    name: "Mr. Okello David",
    initials: "OD",
    accent: "avatar-olive",
    group: "Academic Committee",
    role: "Teacher",
    online: false,
    unread: 0,
    lastActive: "Yesterday",
    preview: "Musoke: The Term 2 Exam Papers are ready for review...",
    messages: [
      { id: 1, sender: "incoming", text: "The Term 2 Exam Papers are ready for review. I highlighted the sections that need additional moderation.", time: "Yesterday" },
      { id: 2, sender: "outgoing", text: "Thanks, I’ll review the highlighted sections before the noon briefing.", time: "Yesterday" },
    ],
  },
  {
    id: "nakato-sarah",
    name: "Nakato Sarah (Admin)",
    initials: "NS",
    accent: "avatar-warm",
    group: "School Operations",
    role: "Administrator",
    online: true,
    unread: 1,
    lastActive: "Yesterday",
    preview: "I’ve attached the proposed agenda for the Sports Day Logistics meeting.",
    messages: [
      { id: 1, sender: "incoming", text: "I’ve attached the proposed agenda for the Sports Day Logistics meeting.", time: "Yesterday" },
      { id: 2, sender: "outgoing", text: "Great. I’ll circulate it to the parent committee after the approval call.", time: "Yesterday" },
    ],
  },
  {
    id: "namubiru-janet",
    name: "Mrs. Namubiru Janet",
    initials: "MN",
    accent: "avatar-red",
    group: "Parent Forum",
    role: "Parent",
    online: false,
    unread: 0,
    lastActive: "Monday",
    preview: "Please confirm the Sports Day Logistics for Friday.",
    messages: [
      { id: 1, sender: "incoming", text: "Please confirm the Sports Day Logistics for Friday.", time: "Monday" },
      { id: 2, sender: "outgoing", text: "Yes, I’ll confirm the final arrangements by 4 PM today.", time: "Monday" },
    ],
  },
];

function ConversationListItem({ conversation, active, onSelect }) {
  return (
    <button
      type="button"
      className={`conversation ${active ? "active" : ""} ${conversation.unread > 0 ? "unread" : ""}`}
      onClick={() => onSelect(conversation.id)}
    >
      <span className={`avatar ${conversation.accent}`}>{conversation.initials}</span>
      <span className="conversation-info">
        <span className="conversation-head">
          <strong>{conversation.name}</strong>
          <span>{conversation.lastActive}</span>
        </span>
        <span className="preview">{conversation.preview}</span>
      </span>
      {conversation.unread > 0 && <span className="conversation-badge">{conversation.unread}</span>}
    </button>
  );
}

function MessageBubble({ message }) {
  if (message.sender === "document") {
    return (
      <div className="document-card">
        <div className="doc-info">
          <div className="doc-icon">PDF</div>
          <div>
            <strong>{message.title}</strong>
            <span>{message.meta}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${message.sender}`}>
      <p>{message.text}</p>
      <span>{message.time}</span>
    </div>
  );
}

function Communicationspage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(initialConversations[0].id);
  const [draftMessage, setDraftMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [conversations, activeConversationId]
  );

  const filteredConversations = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();

    if (!term) return conversations;

    return conversations.filter((conversation) => {
      const haystack = `${conversation.name} ${conversation.preview} ${conversation.group}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [conversations, searchQuery]);

  const selectConversation = (id) => {
    setActiveConversationId(id);
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation
      )
    );
  };

  const handleSendMessage = () => {
    const trimmed = draftMessage.trim();
    if (!trimmed) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== activeConversationId) return conversation;

        return {
          ...conversation,
          unread: 0,
          lastActive: "Now",
          preview: trimmed,
          messages: [
            ...conversation.messages,
            {
              id: Date.now(),
              sender: "outgoing",
              text: trimmed,
              time: timestamp,
            },
          ],
        };
      })
    );

    setDraftMessage("");
  };

  return (
    <div className="app-layout">
      <Sidebarcomponent />

      <main className="main">
        <Topbarcomponent />

        <div className="communications-shell">
          <aside className="conversation-list">
            <div className="conversation-toolbar">
              <div className="list-header">
                <h3>Inbox</h3>
                <span>{filteredConversations.length}</span>
              </div>

              <SearchComponent
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
                placeholder="Search conversations..."
                ariaLabel="Search conversations"
                size="sm"
                className="conversation-search"
                suggestions={conversations.map((conversation) => conversation.name)}
              />
            </div>

            {filteredConversations.length === 0 ? (
              <div className="empty-state">No conversations match your search.</div>
            ) : (
              filteredConversations.map((conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={conversation}
                  active={conversation.id === activeConversation.id}
                  onSelect={selectConversation}
                />
              ))
            )}
          </aside>

          <main className="chat-panel">
            <div className="chat-header">
              <div className="chat-header-text">
                <h2>{activeConversation.name}</h2>
                <div className="group-meta">
                  <p>{activeConversation.group}</p>
                  <span className={`status-dot ${activeConversation.online ? "online" : "offline"}`} aria-label={activeConversation.online ? "online" : "offline"}></span>
                </div>
              </div>

              <div className="chat-header-actions">
                <button className="profile-btn" type="button">View Profile</button>
                <button className="add-member-btn" type="button" aria-label="Add people to group">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M18 8v6M15 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="message-thread">
              <div className="thread-date">TODAY</div>
              {activeConversation.messages.map((message) => (
                <MessageBubble key={message.id ?? message.title} message={message} />
              ))}
            </div>

            <div className="quick-actions">
              <button type="button" onClick={() => setDraftMessage("Thanks, I’ll share the updated schedule shortly.")}>Quick reply</button>
              <button type="button" onClick={() => setDraftMessage("Could you send the latest notes by 3 PM?")}>Follow up</button>
            </div>

            <div className="composer">
              <input
                type="text"
                placeholder="Type your message here..."
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSendMessage();
                }}
              />
              <button type="button" onClick={handleSendMessage}>Send</button>
            </div>
            <p className="composer-note">Messages are encrypted and visible only to members of this group.</p>
          </main>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Communicationspage;
