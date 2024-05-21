const Chat = () => {
  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">문토 연애관 소셜링</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Chat;
