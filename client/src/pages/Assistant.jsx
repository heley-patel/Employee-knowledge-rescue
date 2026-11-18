import { useState } from 'react';
import { BrainCircuit, FileText, Send } from 'lucide-react';
import { api } from '../services/api';

export default function Assistant({ token }) {
  const [question, setQuestion] = useState(
    'How should I handle a duplicate payment complaint?'
  );

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    const text = question;
    setQuestion('');

    setMessages(current => [...current, { q: text }]);

    setLoading(true);

    try {
      const result = await api(
        '/api/assistant/ask',
        {
          method: 'POST',
          body: JSON.stringify({ question: text })
        },
        token
      );

      setMessages(current => [
        ...current,
        {
          a: result.answer,
          sources: result.sources,
          gap: !result.answered
        }
      ]);
    } catch (err) {
      setMessages(current => [
        ...current,
        {
          a: err.message,
          gap: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant">
      <header>
        <div>
          <p className="eyebrow">AI KNOWLEDGE ASSISTANT</p>
          <h1>Ask the company knowledge base</h1>
          <p>
            Answers are grounded in DemoTech’s documents—not general AI knowledge.
          </p>
        </div>
      </header>

      <div className="chat">
        <div className="trust">
          <BrainCircuit size={19} />

          <span>
            <b>Verified knowledge only</b>
            <br />
            If the answer isn’t documented, we’ll say so and flag the gap.
          </span>
        </div>

        {!messages.length && (
          <div className="welcome">
            <BrainCircuit />
            <h2>What would you like to know?</h2>
            <p>
              Try asking about billing, leave, returns or customer support.
            </p>
          </div>
        )}

        {messages.map((message, index) =>
          message.q ? (
            <div className="bubble user" key={index}>
              {message.q}
            </div>
          ) : (
            <div className="bubble ai" key={index}>
              <b>Knowledge Assistant</b>

              <p>{message.a}</p>

              {message.sources?.length > 0 && (
                <div className="sources">
                  <small>Sources used</small>

                  {message.sources.map(source => (
                    <span key={source.id}>
                      <FileText size={13} />
                      {source.title}
                    </span>
                  ))}
                </div>
              )}

              {message.gap && (
                <small className="gap-note">
                  This question has been added to the knowledge-gaps list for the admin.
                </small>
              )}
            </div>
          )
        )}

        {loading && (
          <div className="bubble ai">
            Searching company knowledge…
          </div>
        )}
      </div>

      <div className="composer">
        <input
          value={question}
          onChange={event => setQuestion(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && ask()}
          placeholder="Ask a question about DemoTech…"
        />

        <button
          className="primary"
          onClick={ask}
          disabled={loading}
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}