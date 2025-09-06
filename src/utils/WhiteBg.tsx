import GoBack from "./GoBack";
import Screen from "./Screen";

type whiteProps = {
  children: React.ReactNode;
  write?: boolean;
};

const WhiteBg = ({ children, write }: whiteProps) => {
  return (
    <section className="bg-darkBlue pb-[1rem]">
      {!write && (
        <div className="pt-[8rem]">
          <Screen>
            <GoBack />
          </Screen>
        </div>
      )}
      <div className="roundedBg mt-[6rem]">
        <Screen>
          <div className="secondBg round p-6">{children}</div>
        </Screen>
      </div>
    </section>
  );
};

export default WhiteBg;
