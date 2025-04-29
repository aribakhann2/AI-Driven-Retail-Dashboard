import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, UserIcon } from 'lucide-react';

interface GenderDistribution {
  male: number;
  female: number;
  others: number;
}

interface ClientAnalysisProps {
  genderDistribution: GenderDistribution;
}

export function ClientAnalysis({ genderDistribution }: ClientAnalysisProps) {
  // Calculate out of 10 based on the percentage values from backend
  const maleClients = Math.round((genderDistribution.male / 100) * 10);
  const femaleClients = Math.round((genderDistribution.female / 100) * 10);
  const otherClients = 10 - maleClients - femaleClients;

  return (
    <Card className="h-[100%]">
      <CardHeader>
        <CardTitle>Client Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <User
              key={i}
              className={`h-6 w-6 ${i < maleClients ? 'text-blue-500' : i < maleClients + femaleClients ? 'text-green-500' : 'text-gray-400'}`}
            />
          ))}
        </div>

        <div className="bg-sidebar rounded-lg p-6 text-black">
          <div className="flex items-center gap-2 mb-2">
            <UserIcon className="h-5 w-5" />
            <span>On average,</span>
          </div>
          <p className="text-xl font-bold mb-1">{maleClients} out of 10</p>
          <p>clients are Male</p>
          <p className="text-xl font-bold mb-1">{femaleClients} out of 10</p>
          <p>clients are Female</p>
          {otherClients > 0 && (
            <p className="text-xl font-bold mb-1">{otherClients} out of 10 clients are Others</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
