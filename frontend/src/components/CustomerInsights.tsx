import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface SocialEngagementData {
  platform: string;
  total_engagement_score: string;
  scaled_engagement_score: string;
}

interface LeadBreakdownData {
  lead: number;
  qualified: number;
  converted: number;
}

interface CustomerInsightsProps {
  socialEngagement?: SocialEngagementData[];
  leadBreakdown?: LeadBreakdownData[];
}

const COLORS = ['#1a5654', '#abff91', '#5cd95b'];

export function CustomerInsights({ socialEngagement = [], leadBreakdown = [] }: CustomerInsightsProps) {
  const conversionData = [
    { name: 'Leads', value: leadBreakdown[0]?.lead ?? 0 },
    { name: 'Qualified', value: leadBreakdown[0]?.qualified ?? 0 },
    { name: 'Converted', value: leadBreakdown[0]?.converted ?? 0 }
  ];

  const platformEngagementData = socialEngagement.map((platform) => ({
    platform: platform.platform,
    engagement: parseInt(platform.total_engagement_score || '0')
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Lead Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-sm mt-2">
              {conversionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={platformEngagementData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#1a5654" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
