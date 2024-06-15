import Logo from "@/components/Logo";

const loading = () => {
  return (
    <div className="h-screen w-full bg-transparent backdrop-blur flex flex-col items-center justify-center">
      <Logo />
      <p className="text-gray-500 text-lg font-black"> Loading .....</p>
    </div>
  );
};

export default loading;
