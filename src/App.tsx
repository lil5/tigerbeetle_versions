import { useMemo, useState } from "react";
import output from "./output.json";

type UpgradeItem = (typeof output)[0] & {
  color1?: string;
  color2?: string;
  color3?: string;
};

// #a991f7 #f6d860 #37cdbe

function App() {
  const [version, setVersion] = useState("");
  const upgradePath: UpgradeItem[] = useMemo(() => {
    if (!version) return output;
    let nextV = version;
    const result: UpgradeItem[] = [...output];
    let foundLo = 0;
    for (let i = result.length - 1; i >= 0; i--) {
      const o = { ...result[i] };
      if (o.v == version) {
        o.color1 = "#f6d860";
        if (o.v !== o.hi) {
          nextV = o.hi;
        }
      }
      if (o.v == nextV) {
        o.color2 = "#37cdbe";
        if (o.v !== o.hi) {
          nextV = o.hi;
        }
      }
      if (o.u && foundLo == 0) {
        foundLo = 1;
      }
      if (foundLo == 1) {
        o.color3 = "#a991f7";
      }
      if (o.v == version) {
        foundLo = 2;
      }
      result[i] = o;
    }
    return result;
  }, [version]);

  function styleV(c?: string) {
    return c
      ? {
          outline: "2px solid " + c,
        }
      : {};
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Lowest upgradable from</th>
            <th>Highest upgradable to</th>
            <th>Client lowest supported</th>
          </tr>
        </thead>
        <tbody>
          {upgradePath.map((item) => (
            <tr key={item.v}>
              <td
                onMouseEnter={() => setVersion(item.v)}
                onMouseLeave={() => setVersion("")}
                style={styleV(item.color1)}
              >
                {item.v}
              </td>
              <td>{item.u}</td>
              <td style={styleV(item.color2)}>{item.hi}</td>
              <td style={styleV(item.color3)}>{item.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
