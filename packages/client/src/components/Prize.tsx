export default function Prize({
  visible,
  text,
}: {
  visible: boolean;
  text: string;
}) {
  return (
    <div
      className="absolute left-[230px] top-[665px] w-[1460px] h-[130px] before:content-[''] before:absolute before:inset-0 before:bg-[#2A2A2A] before:rounded-[24px] before:blur-[2px] transition-all duration-500"
      style={{ opacity: visible ? 100 : 0 }}
    >
      <div className="flex justify-center items-center text-center h-full relative text-white text-6xl font-bold">
        {text}
      </div>
    </div>
  );
}
