import { usePathname } from "next/navigation";
import Link from "next/link";

import Button from "../common/Button/Button";

import TextConstants from "@/constants/textConstants";

const Header = () => {
  const { appName, buttonHome, buttonSearch } = TextConstants.app;

  const pathname = usePathname();

  return (
    <header>
      <h1>{appName}</h1>
      <Link href={pathname === "/" ? "/search" : "/"}>
        <Button
          type="button"
          label={pathname === "/" ? buttonSearch : buttonHome}
        />
      </Link>
    </header>
  );
};

export default Header;
