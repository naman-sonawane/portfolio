
export const Contact = () => {

  return (
    <a
      href="/work"
      className="contact-container bg-[#a8977a] text-[#44362b] rounded-xl p-4 relative"
    >
      <img
        src="/top-right.svg"
        alt="top-right"
        className="absolute right-6 contact-arrow"
        height={20}
        width={20}
      />

      <div className="contact-text instrument absolute bottom-6 text-4xl ">
        My <span className="italic">Work</span>
      </div>
    </a>
  );
};
