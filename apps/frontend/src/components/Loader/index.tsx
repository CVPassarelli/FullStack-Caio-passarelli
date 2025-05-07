export const Loader = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return (
    <div
      role="status"
      className={`flex w-screen h-screen bg-[#00000050] fixed top-0 left-0 border`}>
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    </div>
  );
};
