import { createEffect, createMemo, For } from "solid-js";
import * as d3 from "d3";

interface AnalysisProps {
  projects: Array<{ stack: string[] }>;
}

interface LangStat {
  name: string;
  count: number;
  projects: number;
}

export default function Analysis(props: AnalysisProps) {
  let pieRef: SVGSVGElement | undefined;
  let barRef: SVGSVGElement | undefined;

  const stats = createMemo<LangStat[]>(() => {
    const countMap = new Map<string, number>();
    const projectMap = new Map<string, number>();

    for (const p of props.projects) {
      const langs = p.stack ?? [];
      new Set(langs).forEach((l) =>
        projectMap.set(l, (projectMap.get(l) ?? 0) + 1),
      );
      langs.forEach((l) => countMap.set(l, (countMap.get(l) ?? 0) + 1));
    }

    return Array.from(projectMap.entries())
      .map(([name, projects]) => ({
        name,
        projects,
        count: countMap.get(name) ?? 0,
      }))
      .sort((a, b) => b.count - a.count);
  });

  const color = d3.scaleOrdinal<string>(d3.schemeTableau10);
  const colorOf = (name: string) => color(name);

  const drawPie = () => {
    if (!pieRef) return;
    const data = stats();
    if (data.length === 0) return;

    const size = 280;
    const radius = size / 2 - 10;

    const svg = d3
      .select(pieRef)
      .attr("viewBox", `0 0 ${size} ${size}`)
      .attr("width", "100%");
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`);

    const total = d3.sum(data, (d) => d.count);

    const pie = d3
      .pie<LangStat>()
      .value((d) => d.count)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<LangStat>>()
      .innerRadius(radius * 0.58)
      .outerRadius(radius)
      .cornerRadius(4)
      .padAngle(0.02);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d) => colorOf(d.data.name))
      .attr("stroke", "#374151")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .style("transition", "opacity 0.15s")
      .on("mouseenter", function () {
        d3.select(this).style("opacity", 0.7);
      })
      .on("mouseleave", function () {
        d3.select(this).style("opacity", 1);
      })
      .append("title")
      .text(
        (d) =>
          `${d.data.name}\n${d.data.count} (${(
            (d.data.count / total) *
            100
          ).toFixed(1)}%)`,
      );

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("fill", "#4ade80")
      .attr("font-size", "28")
      .attr("font-weight", "700")
      .text(total);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.4em")
      .attr("fill", "#9ca3af")
      .attr("font-size", "11")
      .text("total");
  };

  const drawBar = () => {
    if (!barRef) return;
    const data = stats();
    if (data.length === 0) return;

    const width = 320;
    const rowHeight = 28;
    const marginTop = 4;
    const marginBottom = 4;
    const marginLeft = 82;
    const marginRight = 28;
    const height = marginTop + data.length * rowHeight + marginBottom;

    const svg = d3
      .select(barRef)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%");
    svg.selectAll("*").remove();

    const max = d3.max(data, (d) => d.projects) ?? 1;

    const x = d3
      .scaleLinear()
      .domain([0, max])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([marginTop, height - marginBottom])
      .padding(0.22);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", (d) => y(d.name) ?? 0)
      .attr("width", (d) => Math.max(0, x(d.projects) - marginLeft))
      .attr("height", y.bandwidth())
      .attr("rx", 4)
      .attr("fill", (d) => colorOf(d.name))
      .attr("opacity", 0.85)
      .style("transition", "opacity 0.15s")
      .on("mouseenter", function () {
        d3.select(this).attr("opacity", 1);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 0.85);
      })
      .append("title")
      .text((d) => `${d.name}: ${d.projects} project(s)`);

    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", marginLeft - 8)
      .attr("y", (d) => (y(d.name) ?? 0) + y.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#d1d5db")
      .attr("font-size", "12")
      .text((d) => d.name);

    svg
      .selectAll(".value")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.projects) + 6)
      .attr("y", (d) => (y(d.name) ?? 0) + y.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .attr("fill", "#9ca3af")
      .attr("font-size", "11")
      .text((d) => d.projects);
  };

  createEffect(() => {
    stats();
    drawPie();
    drawBar();
  });

  return (
    <div class="sticky top-5 m-5 rounded-2xl bg-gray-700 p-5 flex flex-col gap-6">
      <p class="text-center text-green-400 font-bold text-xl">Analysis</p>

      <section class="flex flex-col gap-3">
        <svg ref={pieRef} />
        <ul class="flex flex-wrap gap-x-3 gap-y-1 justify-center text-xs">
          <For each={stats()}>
            {(s) => (
              <li class="flex items-center gap-1.5">
                <span
                  class="inline-block w-2.5 h-2.5 rounded-sm"
                  style={{ background: colorOf(s.name) }}
                />
                <span class="text-gray-300">{s.name}</span>
              </li>
            )}
          </For>
        </ul>
      </section>

      <section class="flex flex-col gap-3">
        <h3 class="text-xs uppercase tracking-widest text-gray-400">
          Projects per language
        </h3>
        <svg ref={barRef} />
      </section>
    </div>
  );
}
