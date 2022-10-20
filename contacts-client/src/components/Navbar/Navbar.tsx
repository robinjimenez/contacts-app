import TextButton from "../common/TextButton/TextButton";

const Navbar = () => {
  return (
    <div className="border-b border-black flex justify-between items-center p-4">
      <h1>Contacts App</h1>
      <div className="grid grid-cols-2 grid-row-1 gap-4">
        <TextButton text="Add new" />
        <TextButton text="Log in" />
      </div>
    </div>
  );
}

export default Navbar
