import { useState } from "react";

type Post = {
  name: string;
  message: string;
  time: string;
};

export default function FarmerForumPage() {
  const defaultPosts: Post[] = [
    {
      name: "Farmer Community",
      message: "Drip irrigation helped me save water and increase yield 🌾",
      time: new Date().toLocaleString(),
    },
    {
      name: "Ramesh (Tamil Nadu)",
      message: "Neem oil worked really well against pests this season.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Sita Devi",
      message: "Soil testing before sowing made a huge difference!",
      time: new Date().toLocaleString(),
    },
    {
      name: "Agri Expert",
      message: "Crop rotation can naturally improve soil fertility 🌱",
      time: new Date().toLocaleString(),
    },
    {
      name: "Karthik",
      message: "Weather alerts saved my crops from unexpected rain.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Organic Farmer",
      message: "Using compost instead of chemicals improved soil health.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Lakshmi",
      message: "Mulching helped retain moisture during summer.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Village Collective",
      message: "Selling directly through marketplace gave better price.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Suresh",
      message: "Intercropping reduced pest attacks significantly.",
      time: new Date().toLocaleString(),
    },
    {
      name: "Farmula AI",
      message: "AI insights help farmers make smarter decisions 🚜",
      time: new Date().toLocaleString(),
    },
  ];

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setPosts([
      {
        name,
        message,
        time: new Date().toLocaleString(),
      },
      ...posts,
    ]);

    setName("");
    setMessage("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1679082310270-4fdaf3c67a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3Vuc2V0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODc5MzI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* MAIN GLASS CONTAINER */}
      <div className="w-full max-w-4xl bg-white/85 backdrop-blur-2xl rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.35)] p-10 border border-green-200 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight">
            Farmer Forum
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A community-driven space where farmers share experiences, advice,
            and success stories
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-md border border-green-100 mb-12 mt-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ✍️ Share Your Experience
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input mb-4"
            required
          />

          <textarea
            placeholder="Share your farming experience, tips, or challenges..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="input resize-y mb-4"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-[1.02] transition shadow-lg text-lg"
          >
            Post to Community
          </button>
        </form>

        {/* POSTS */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🧑‍🌾 Recent Posts
          </h2>

          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <div className="text-6xl mb-4">💬</div>
              <p className="font-semibold">No posts yet</p>
              <p className="text-sm mt-1">
                Be the first farmer to start the conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-5 max-h-[360px] overflow-y-auto pr-2">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl p-5 border border-green-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {/* ACCENT STRIP */}
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-green-500 rounded-l-xl" />

                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-green-700">
                      👤 {post.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {post.time}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {post.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 2px solid #dcfce7;
          background: #f9fffb;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .input:focus {
          outline: none;
          border-color: #22c55e;
          background: white;
          box-shadow: 0 0 0 4px rgba(34,197,94,0.15);
        }
      `}</style>
    </div>
  );
}