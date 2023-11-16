import { usePathname } from "next/navigation";
import Link from "next/link";

import Button from "../common/Button/Button";

import TextConstants from "@/constants/textConstants";

const Header = () => {
  const { appName } = TextConstants.app;

  const pathname = usePathname();

  return (
    <header className="header">
      <h1>{appName}</h1>
      <div className="header__toggle">
        <Link href={pathname === "/" ? "/search" : "/"}>
          <Button icon={pathname === "/" ? "search" : "table"} type="button" />
        </Link>
        <Button
          icon={pathname === "/" ? "table" : "search"}
          isDisabled
          type="button"
        />
      </div>
    </header>
  );
};

export default Header;
