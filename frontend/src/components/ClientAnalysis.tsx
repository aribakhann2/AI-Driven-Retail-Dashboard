import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, UserIcon } from 'lucide-react';


export function ClientAnalysis() {
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
              className={`h-6 w-6 ${i < 7 ? 'text-green-500' : 'text-gray-400'}`}
            />
          ))}
        </div>
        
        <div className="bg-sidebar rounded-lg p-6 text-black">
          <div className="flex items-center gap-2 mb-2">
            <UserIcon className="h-5 w-5" />
            <span>On average,</span>
          </div>
          <p className="text-xl font-bold mb-1">7 out of 10</p>
          <p>clients are</p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300">
            Female
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
