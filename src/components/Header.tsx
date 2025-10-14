import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <ThemeSwitcher
        isScrolled={true}
        isMobile={false}
        animationDuration={0.3}
        formationDelayDuration={0.1}
      />
    </div>
  );
};

export default Header;
