"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  BriefcaseIcon,
  LineChart as LineChartIcon,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ✅ Dynamically load Recharts (VERY IMPORTANT) */
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);

const DashboardView = ({ insights = {} }) => {
  /* ✅ Safe defaults to prevent crashes */
  const {
    salaryRanges = [],
    marketOutlook = "Neutral",
    growthRate = 0,
    demandLevel = "Medium",
    topSkills = [],
    keyTrends = [],
    recommendedSkills = [],
    lastUpdated,
    nextUpdate,
  } = insights;

  /* ✅ Transform salary data safely */
  const salaryData = salaryRanges.map((range) => ({
    name: range.role,
    min: (range.min || 0) / 1000,
    max: (range.max || 0) / 1000,
    median: (range.median || 0) / 1000,
  }));

  const getDemandLevelColor = (level = "") => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook = "") => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChartIcon, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChartIcon, color: "text-gray-500" };
    }
  };

  const { icon: OutlookIcon, color: outlookColor } =
    getMarketOutlookInfo(marketOutlook);

  const lastUpdatedDate = lastUpdated
    ? format(new Date(lastUpdated), "dd/MM/yyyy")
    : "N/A";

  const nextUpdateDistance = nextUpdate
    ? formatDistanceToNow(new Date(nextUpdate), { addSuffix: true })
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(growthRate).toFixed(1)}%
            </div>
            <Progress value={growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>
            Minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="min" fill="#94a3b8" />
                <Bar dataKey="median" fill="#64748b" />
                <Bar dataKey="max" fill="#475569" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;