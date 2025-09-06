import GoBack from "./GoBack";
import Screen from "./Screen";
import ShareMedia from "./ShareMedia";

const Head = ({ shareHidden }: { shareHidden?: boolean }) => {
  return (
    <Screen>
      <div className="pt-[8rem] flex items-center justify-between">
        <GoBack />
        {!shareHidden && <ShareMedia />}
      </div>
    </Screen>
  );
};

export default Head;
