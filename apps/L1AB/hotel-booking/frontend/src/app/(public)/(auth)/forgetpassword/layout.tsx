const ForgetPassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {children}
      <p className="text-center pb-8 text-sm">©2024 Pedia is an Pedia Group company.</p>
    </div>
  );
};

export default ForgetPassLayout;
