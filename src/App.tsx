import { useMemo, useState } from "preact/compat";
import output from "./output.json";

type UpgradeItem = (typeof output)[0] & {
  color1?: string;
  color2?: string;
};

function App() {
  const [version, setVersion] = useState(() => window.location.hash.slice(1));
  const upgradePath: UpgradeItem[] = useMemo(() => {
    if (!version) return output;
    window.history.replaceState(null, "", `#${version}`);
    let nextV = version;
    const result: UpgradeItem[] = [...output];
    for (let i = result.length - 1; i >= 0; i--) {
      const o = { ...result[i] };
      if (o.v == version) {
        o.color1 = "#f6d860";
        if (o.v !== o.hi) {
          nextV = o.hi;
          o.color2 = "#37cdbe";
        }
      }
      if (o.v == nextV) {
        o.color2 = "#37cdbe";
        if (o.v !== o.hi) {
          nextV = o.hi;
        } else {
          o.color2 = "";
        }
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
                onPointerEnter={() => setVersion(item.v)}
                style={styleV(item.color1)}
              >
                {item.v}
              </td>
              <td>{item.u}</td>
              <td style={styleV(item.color2)}>{item.hi}</td>
              <td>{item.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
