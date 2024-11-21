'use client';

interface Props {
  children: React.ReactNode;
  name: string;
  onClick?: () => void;
}

const NavigationLink = ({ children, name, onClick }: Props) => {
  return (
    <a
      onClick={onClick}
      href="#"
      className="group h-12 flex p-2.5 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-500 stroke-neutral-800 text-neutral-400 hover:bg-gray-100 place-items-center gap-3 hover:border transition-colors duration-1000"
    >
      {children}
      <p data-testid="name" className=" font-poppins overflow-clip whitespace-nowrap tracking-wide ">
        {name}
      </p>
    </a>
  );
};

export default NavigationLink;
