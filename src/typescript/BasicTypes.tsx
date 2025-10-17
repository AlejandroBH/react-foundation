export const BasicTypes = () => {
  const name: string = "Alejandro";
  const age: number = 33;
  const isActive: boolean = true;

  const powers: string[] = ["React", "ReactNative", "Angular", "Vue", "Qwik"];

  powers.push("Next");

  return (
    <>
      <h3>Tipos Basicos</h3>
      {name} {age} {isActive ? "true" : "false"}
      <br />
      {powers.join(", ")}
    </>
  );
};
