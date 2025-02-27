import { Link, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { YAxis, Line, XAxis, LineChart, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "~/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollBar } from "~/components/ui/scroll-area";
import { ScrollArea } from "~/components/ui/scroll-area";
import ArticlesSubjects from "~/components/common/articles_subjects";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Academia" },
        { name: "description", content: "Academia" },
    ];
}
export { loader } from "~/components/layer1/layer1_loader";

const chartConfig = {
    x: {
        label: "Year",
        color: "bg-muted focus:bg-primary/80"
    },
    y: {
        label: "Ratio",
        color: "bg-muted focus:bg-primary/80"
    }
} satisfies ChartConfig;


export default function Home() {
    const { upperSubjectName, upperSubjectCode, articles, activeSubjects, chartData, childSubjectsCodes, childSubjectsNames }: { upperSubjectName: string, upperSubjectCode: string, articles: any[], activeSubjects: string[], chartData: any[], childSubjectsCodes: string[], childSubjectsNames: string[] } = useLoaderData();
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-full">
            <div className="flex flex-col w-[1400px] mx-auto items-start">
                <Button variant="outline" className="mt-20 mb-2 w-fit ml-4">
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Main Category
                    </Link>
                </Button>
                <div className="grid grid-cols-3 gap-4 mb-0 h-[600px] p-4 pt-2 w-[1400px] mx-auto gap-4">
                    <Card className="col-span-2 h-[600px]">
                        <CardHeader>
                            <CardTitle>Ratio of Articles in {upperSubjectName}</CardTitle>
                            <p>from 2016 to 2025</p>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <LineChart
                                    accessibilityLayer={true}
                                    data={chartData}
                                >
                                    {childSubjectsNames.map((subjectName: string, index: number) => {
                                        if (!activeSubjects.includes(childSubjectsCodes[index])) return null;
                                        return (
                                            <Line
                                                key={`subject-line-active-${index}`}
                                                type="monotone"
                                                dataKey={subjectName}
                                                stroke={`hsla(${index * 360 / childSubjectsCodes.length}, 70%, 50%, 1)`}
                                                strokeWidth={3}
                                                dot={true}
                                            />
                                        );
                                    })}
                                    <ChartTooltip />
                                    <CartesianGrid />
                                    <XAxis
                                        dataKey="year"
                                    />
                                    <YAxis />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="h-[600px]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Subjects</CardTitle>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="select-all"
                                    checked={childSubjectsCodes.length === activeSubjects.length}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            // 모든 subjects 선택
                                            // setPreviousSubjects(activeSubjects)
                                            navigate(`?upperSubjectCode=${upperSubjectCode}&upperSubjectName=${upperSubjectName}&activeSubjects=${childSubjectsCodes.join(',')}`);
                                        } else {
                                            navigate(`?upperSubjectCode=${upperSubjectCode}&upperSubjectName=${upperSubjectName}&activeSubjects=`);
                                        }
                                    }}
                                />
                                <label htmlFor="select-all" className="text-sm">
                                    Select All
                                </label>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <ScrollArea className="max-h-[500px] w-[400px]">
                                <div className="flex flex-col gap-2 w-[400px]">
                                    {childSubjectsNames.map((subjectName: string, index: number) => {
                                        const isActive = activeSubjects.includes(childSubjectsCodes[index]);
                                        const newSet = new Set(activeSubjects);
                                        if (isActive) {
                                            newSet.delete(childSubjectsCodes[index]);
                                        } else {
                                            newSet.add(childSubjectsCodes[index]);
                                        }
                                        const newActiveSubjects = Array.from(newSet);
                                        const newActiveSubjectsforParam = newActiveSubjects.filter((subject: string) => subject.length === 2 && subject.startsWith(upperSubjectCode)).join(',');

                                        return (
                                            <Link
                                                key={subjectName}
                                                to={`/layer1?upperSubjectCode=${upperSubjectCode}&upperSubjectName=${upperSubjectName}&activeSubjects=${newActiveSubjectsforParam}`}
                                                className={`w-full relative h-9 p-2 border rounded-md ${isActive ? 'bg-primary/10' : 'bg-background hover:bg-secondary hover:text-secondary-foreground '
                                                    } items-center flex text-sm justify-between`}
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-4 h-9 rounded-md absolute left-0"
                                                        style={{ backgroundColor: `hsl(${index * 360 / childSubjectsNames.length}, 70%, 50%)` }}
                                                    />
                                                    <span className="pl-6">{subjectName}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <ScrollBar forceMount={true} />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
                <ArticlesSubjects activeSubjects={activeSubjects} subjects={childSubjectsNames} subjects_code={childSubjectsCodes} initialArticles={articles} />
            </div>
        </div>
    );
}
