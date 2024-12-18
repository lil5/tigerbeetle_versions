import { useMemo, useState } from "react";
import output from "./output.json";

type UpgradeItem = (typeof output)[0] & {
  color1?: string;
  color2?: string;
};

function App() {
  const [version, setVersion] = useState("");
  const upgradePath: UpgradeItem[] = useMemo(() => {
    if (!version) return output;
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
                onMouseLeave={() => setVersion("")}
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

      <h1>
        Tigerbeetle Versions Tool <sup>(unofficial)</sup>
      </h1>
      <hr />
      <center>
        <p>
          <a
            target="_blank"
            href="https://github.com/tigerbeetle/tigerbeetle/releases"
          >
            Tigerbeetle Releases
          </a>
          {" | "}
          <a
            target="_blank"
            href="https://github.com/lil5/tigerbeetle_versions"
          >
            Tool GitHub
          </a>
        </p>
        Lucian I. Last{" "}
        <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
          &copy;
        </span>
        {" Apache 2.0"}
      </center>
    </>
  );
}

export default App;
