import { Artifact } from "./artifact";

type Tag =
  | { tagName: string; props: Record<string, string>; children: Tag[] }
  | string;

function createElement(
  tagName: string,
  props?: Record<string, string>,
  children?: Tag[]
): Tag {
  return {
    children: children ?? [],
    props: props ?? {},
    tagName,
  };
}

export function stringifyTag(tag: Tag): string {
  if (typeof tag === "string") {
    return tag;
  }

  const { tagName, props, children } = tag;
  let attributes = Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  if (attributes) {
    attributes = " " + attributes;
  }
  if (["img", "br"].includes(tagName)) {
    return `<${tagName}${attributes} />`;
  }
  const openTag = `<${tagName}${attributes}>`;
  return `${openTag}${children.map(stringifyTag).join("")}</${tagName}>`;
}

type HtmlFn = (attributes?: Record<string, string>, children?: Tag[]) => Tag;

const html = new Proxy<Record<string, HtmlFn>>(
  {},
  {
    get:
      (_, tagName: string) =>
      (props: Record<string, string>, children: Tag[]) =>
        createElement(tagName, props, children),
  }
);

export function getComparisonTable(params: {
  artifacts: { [key: string]: Artifact[] };
}) {
  // const table = (() => {
  // const rows = embeds
  //   .map((data) => {
  //     return dedent`
  //         <tr>
  //           <td><code>${data.displayName}</code></td>
  //           <td><code>${round(data.currentValue, 2)}${data.units}</code></td>
  //           <td>${
  //             typeof data.lastValue === "undefined"
  //               ? ""
  //               : `<code>${round(data.lastValue, 2)}${data.units}</code>`
  //           }</td>
  //           <td>${
  //             !data.diff
  //               ? "<code>0</code>"
  //               : dedent`
  //               <picture title=${JSON.stringify(
  //                 data.diff.value > 0 ? "increase" : "decrease"
  //               )}>
  //                 <img width="16" valign="middle" src="${
  //                   data.diff.arrowImage
  //                 }">
  //               </picture>
  //               <code>${data.diff.value > 0 ? "+" : ""}${round(
  //                   data.diff.value,
  //                   2
  //                 )}${data.units}</code>
  //                 `
  //           }</td>
  //           <td>
  //             <details><summary><img valign="middle" src="${
  //               data.small
  //             }" /></summary><br/><img src="${data.big}" /></details>
  //           </td>
  //         </tr>
  //       `;
  //   })
  //   .join("\n");
  // return dedent`
  //     <table>
  //       <thead>
  //         <tr>
  //           <th align="left">benchmark</th>
  //           <th>current value</th>
  //           <th>last value</th>
  //           <th>diff</th>
  //           <th>trend</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         ${rows}
  //       </tbody>
  //     </table>
  //   `;
  // })();

  return html.table({}, [
    html.thead({}, [
      html.tr({}, [
        html.th({ align: "left" }, ["benchmark"]),
        html.th({}, ["current value"]),
        html.th({}, ["last value"]),
        html.th({}, ["diff"]),
        html.th({}, ["trend"]),
      ]),
    ]),
    html.tbody(
      {},
      Object.entries(params.artifacts).map(([key, artifacts]) => {
        const lastOnes = artifacts.slice(-2);
        const current = lastOnes.length === 2 ? lastOnes[1] : lastOnes[0];
        const last = lastOnes.length === 2 ? lastOnes[0] : undefined;
        const diff = !last ? undefined : last.value - current.value;
        const units = current.units ?? "";
        const trendApiUrl = `https://benchy.hagever.com/api/embed/small`;

        const getSearchParamsValues = () => {
          const sp = new URLSearchParams();
          sp.set("current", String(current.value));
          artifacts.slice(0, -1).forEach((artifact) => {
            sp.append("stored", String(artifact.value));
          });
          if (current.trend) {
            sp.set("coloring", current.trend);
          }
          sp.set("debug", "true");
          return sp;
        };

        const smallTrendParams = (() => {
          const sp = getSearchParamsValues();
          sp.set("withNumbers", "false");
          sp.set("width", "100");
          sp.set("height", "25");
          return String(sp);
        })();

        const bigTrendParams = (() => {
          const sp = getSearchParamsValues();
          return String(sp);
        })();

        return html.tr({ "data-testid": `row-${key}` }, [
          html.td({ "data-testid": `benchmark-${key}` }, [
            html.code({}, [key]),
          ]),
          html.td({ "data-testid": `current-value` }, [
            html.code({}, [stringifyNumber(current.value), units]),
          ]),
          html.td({ "data-testid": "last-value" }, [
            !last ? "-" : html.code({}, [stringifyNumber(last.value), units]),
          ]),
          html.td({ "data-testid": "diff" }, [
            ...(typeof diff === "undefined"
              ? ["-"]
              : [
                  diff === 0
                    ? ""
                    : html.picture(
                        { title: diff && diff > 0 ? "increase" : "decrease" },
                        [
                          html.img({
                            width: "16",
                            valign: "middle",
                            src: arrowImage(
                              diff > 0 ? "up" : "down",
                              arrowColor(diff, current.trend)
                            ),
                          }),
                        ]
                      ),
                  " ",
                  html.code({}, [sign(diff), stringifyNumber(diff), units]),
                ]),
          ]),
          html.td({ "data-testid": "trend" }, [
            html.details({}, [
              html.summary({}, [
                html.img({
                  valign: "middle",
                  src: `${trendApiUrl}?${smallTrendParams}`,
                }),
              ]),
              html.br(),
              html.img({
                src: `${trendApiUrl}?${bigTrendParams}`,
                valign: "middle",
              }),
            ]),
          ]),
        ]);
      })
    ),
  ]);
}

function sign(number: number): string {
  return number > 0 ? "+" : "";
}

function stringifyNumber(number: number, digitsAfterPoint: number = 2): string {
  const exponent = 10 ** digitsAfterPoint;
  return String(Math.round(number * exponent) / exponent);
}

function arrowImage(
  direction: "up" | "down",
  color: "green" | "red" | "blue"
): string {
  return `https://benchy.hagever.com/assets/${direction}-${color}.svg`;
}

function arrowColor(
  diff: number,
  trend: Artifact["trend"]
): "green" | "red" | "blue" {
  if (diff === 0 || !trend) {
    return "blue";
  }

  if (trend === "lower-is-better") {
    return diff > 0 ? "red" : "green";
  }

  return diff > 0 ? "green" : "red";
}
