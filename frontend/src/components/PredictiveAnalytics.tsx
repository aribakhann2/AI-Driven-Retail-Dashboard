import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import type { PredictiveMetrics } from '@/types/dashboard';

const predictiveData: PredictiveMetrics = {
  salesForecast: [
    { period: 'Jan', predicted: 50000, actual: 48000 },
    { period: 'Feb', predicted: 55000, actual: 52000 },
    { period: 'Mar', predicted: 60000, actual: 58000 },
    { period: 'Apr', predicted: 65000, actual: null },
    { period: 'May', predicted: 70000, actual: null }
  ],
  demandForecast: [
    { product: 'Product A', predictedDemand: 1200, confidence: 85 },
    { product: 'Product B', predictedDemand: 800, confidence: 90 },
    { product: 'Product C', predictedDemand: 1500, confidence: 75 }
  ],
  productCombinations: [
    { products: ['Product A', 'Product B'], confidence: 85, revenue: 25000 },
    { products: ['Product B', 'Product C'], confidence: 78, revenue: 18000 },
    { products: ['Product A', 'Product C'], confidence: 92, revenue: 30000 }
  ]
};

export function PredictiveAnalytics() {
  return (
    <div className="space-y-6">
      {/* First Row - Three Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stockout Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Stockout Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveData.demandForecast.map((product) => (
                <div key={product.product} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{product.product}</span>
                    <span>{product.confidence}%</span>
                  </div>
                  <Progress value={product.confidence} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveData.demandForecast.map((product) => (
                <div key={product.product} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{product.product}</span>
                    <span>{Math.floor(product.predictedDemand / 200)} Days</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(product.predictedDemand / 1500) * 100}%`,
                        backgroundColor: '#5cd95b'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { product: 'Product A', sales: 1200 },
                    { product: 'Product B', sales: 900 },
                    { product: 'Product C', sales: 1500 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1a5654" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Two Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Combinations */}
        <Card>
          <CardHeader>
            <CardTitle>Product Combinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveData.productCombinations.map((combo, index) => (
                <div key={index} className="space-y-2 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{combo.products.join(' + ')}</span>
                    <span className="text-green-500 font-bold">
                      ${combo.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Confidence Score</span>
                    <span>{combo.confidence}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${combo.confidence}%`,
                        backgroundColor: '#5cd95b'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demand Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictiveData.demandForecast}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis yAxisId="left" orientation="left" stroke="#1a5654" />
                  <YAxis yAxisId="right" orientation="right" stroke="#5cd95b" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="predictedDemand" fill="#1a5654" name="Predicted Demand" />
                  <Bar yAxisId="right" dataKey="confidence" fill="#5cd95b" name="Confidence %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}