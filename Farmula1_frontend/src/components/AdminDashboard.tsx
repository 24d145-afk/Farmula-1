import { motion } from 'motion/react';
import { MapPin, Activity, TrendingUp, AlertTriangle, Users, Sprout, Bell, MessageSquare, FileText, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AdminDashboard() {
  const regionalFarms = [
    { id: 1, name: 'Kumar Farm', farmer: 'Rajesh Kumar', status: 'healthy', x: 20, y: 30, acreage: 12, crop: 'Wheat' },
    { id: 2, name: 'Patel Agro', farmer: 'Suresh Patel', status: 'healthy', x: 45, y: 25, acreage: 18, crop: 'Rice' },
    { id: 3, name: 'Singh Estate', farmer: 'Harpreet Singh', status: 'alert', x: 70, y: 40, acreage: 25, crop: 'Cotton' },
    { id: 4, name: 'Reddy Fields', farmer: 'Vijay Reddy', status: 'healthy', x: 35, y: 60, acreage: 15, crop: 'Sugarcane' },
    { id: 5, name: 'Desai Farm', farmer: 'Amit Desai', status: 'warning', x: 60, y: 70, acreage: 10, crop: 'Maize' },
    { id: 6, name: 'Verma Orchards', farmer: 'Priya Verma', status: 'healthy', x: 25, y: 45, acreage: 8, crop: 'Mango' },
  ];

  const regionalProduction = [
    { month: 'Jan', production: 450 },
    { month: 'Feb', production: 520 },
    { month: 'Mar', production: 480 },
    { month: 'Apr', production: 610 },
    { month: 'May', production: 550 },
    { month: 'Jun', production: 680 },
  ];

  const farmPerformance = [
    { farm: 'Kumar', compliance: 95, yield: 88, subsidy: 85 },
    { farm: 'Patel', compliance: 88, yield: 92, subsidy: 90 },
    { farm: 'Singh', compliance: 72, yield: 65, subsidy: 70 },
    { farm: 'Reddy', compliance: 90, yield: 85, subsidy: 88 },
  ];

  const diseaseAlerts = [
    { name: 'Leaf Rust', severity: 'high', farms: 3, farmNames: 'Singh Estate, Kumar Farm', color: '#ef4444' },
    { name: 'Blight', severity: 'medium', farms: 2, farmNames: 'Patel Agro, Desai Farm', color: '#f59e0b' },
    { name: 'Mildew', severity: 'low', farms: 1, farmNames: 'Verma Orchards', color: '#fbbf24' },
  ];

  const notifications = [
    {
      type: 'alert',
      message: 'Singh Estate: Disease outbreak detected - Intervention required',
      time: '5 min ago',
      color: 'red',
    },
    {
      type: 'info',
      message: 'Patel Agro: Subsidy disbursement completed successfully',
      time: '1 hour ago',
      color: 'green',
    },
    {
      type: 'warning',
      message: 'Desai Farm: Low irrigation detected - Support team notified',
      time: '2 hours ago',
      color: 'orange',
    },
    {
      type: 'info',
      message: 'Kumar Farm: PM-KISAN scheme enrollment completed',
      time: '3 hours ago',
      color: 'blue',
    },
  ];

  const cropDiversity = [
    { name: 'Wheat', value: 35, color: '#f59e0b' },
    { name: 'Rice', value: 25, color: '#4a7c2c' },
    { name: 'Cotton', value: 20, color: '#8b7355' },
    { name: 'Sugarcane', value: 12, color: '#10b981' },
    { name: 'Others', value: 8, color: '#6b7280' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-white mb-1">Government Agricultural Admin</h1>
            <p className="text-slate-300 text-sm">Regional Farm Monitoring & Compliance • District: Nashik</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-slate-700 rounded-full relative" size="icon">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                4
              </div>
            </Button>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Registered Farms', value: '147', icon: MapPin, color: 'from-blue-500 to-cyan-500', change: '+8' },
            { label: 'Active Farmers', value: '163', icon: Users, color: 'from-green-500 to-emerald-500', change: '+12' },
            { label: 'Total Acreage', value: '2,450', icon: Sprout, color: 'from-purple-500 to-pink-500', change: '+125' },
            { label: 'Compliance Rate', value: '87%', icon: TrendingUp, color: 'from-orange-500 to-amber-500', change: '+3%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={`${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-green-700/70 text-sm mb-1">{stat.label}</div>
                <div className="text-green-900">{stat.value}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Regional Farm Map */}
            <Card className="p-6 border-none shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-green-900 mb-1">Regional Farm Network</h2>
                  <p className="text-sm text-green-700/70">Live monitoring of {regionalFarms.length} farms in Nashik District</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs text-gray-600">Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-xs text-gray-600">Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs text-gray-600">Action Needed</span>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 overflow-hidden" style={{ height: '400px' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1700503794627-6ea640996129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGNyb3BzJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzYxMTQ5MzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Regional farm map"
                  className="w-full h-full object-cover opacity-30"
                />
                
                {/* Farm Markers */}
                {regionalFarms.map((farm, index) => (
                  <motion.div
                    key={farm.id}
                    className="absolute group"
                    style={{ left: `${farm.x}%`, top: `${farm.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
                        farm.status === 'healthy' 
                          ? 'bg-green-500' 
                          : farm.status === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      } shadow-lg`}
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Pulse Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        farm.status === 'healthy' 
                          ? 'bg-green-500' 
                          : farm.status === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                      animate={{
                        scale: [1, 2.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <div className="font-semibold text-gray-900">{farm.name}</div>
                      <div className="text-gray-600">{farm.farmer}</div>
                      <div className="text-gray-500">{farm.acreage} acres • {farm.crop}</div>
                    </div>
                  </motion.div>
                ))}

                {/* Government Admin Icon */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </Card>

            {/* Analytics Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Regional Production */}
              <Card className="p-6 border-none shadow-lg">
                <h3 className="text-green-900 mb-4">Regional Production Trends (Tons)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={regionalProduction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7456" />
                    <YAxis stroke="#6b7456" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="production" 
                      stroke="#4a7c2c" 
                      strokeWidth={3}
                      dot={{ fill: '#4a7c2c', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Farm Performance Comparison */}
              <Card className="p-6 border-none shadow-lg">
                <h3 className="text-green-900 mb-4">Farm Performance Scores (%)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={farmPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="farm" stroke="#6b7456" />
                    <YAxis stroke="#6b7456" />
                    <Tooltip />
                    <Bar dataKey="compliance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="yield" fill="#4a7c2c" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="subsidy" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Additional Admin Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Crop Diversity */}
              <Card className="p-6 border-none shadow-lg">
                <h3 className="text-green-900 mb-4">Crop Diversity</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={cropDiversity}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropDiversity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {cropDiversity.slice(0, 4).map((crop) => (
                    <div key={crop.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }} />
                      <span className="text-xs text-gray-600">{crop.name} {crop.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Compliance Tracking */}
              <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-purple-900 mb-2">Compliance & Certification</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Organic Certified</span>
                    <Badge className="bg-green-100 text-green-700">42</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">GAP Compliant</span>
                    <Badge className="bg-blue-100 text-blue-700">87</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Soil Health Card</span>
                    <Badge className="bg-amber-100 text-amber-700">126</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Water Conservation</span>
                    <Badge className="bg-cyan-100 text-cyan-700">94</Badge>
                  </div>
                </div>
              </Card>

              {/* Resource Allocation */}
              <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
                <FileText className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="text-amber-900 mb-2">Resource Allocation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Seeds Distributed</span>
                    <span className="text-sm text-gray-900">2,450 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Fertilizer Stock</span>
                    <span className="text-sm text-gray-900">5,200 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Equipment Loans</span>
                    <span className="text-sm text-gray-900">₹48 Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Training Sessions</span>
                    <span className="text-sm text-gray-900">12 held</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 rounded-full border-amber-300">
                  Manage Resources
                </Button>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Farm Alerts */}
            <Card className="p-6 border-none shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-900">Farm Alerts</h3>
                <Badge className="bg-red-100 text-red-700">{notifications.length}</Badge>
              </div>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border bg-${notification.color}-50 border-${notification.color}-200`}
                  >
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-600">{notification.time}</p>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-full">
                View All Farm Reports
              </Button>
            </Card>

            {/* Disease Outbreak Tracking */}
            <Card className="p-6 border-none shadow-lg">
              <h3 className="text-green-900 mb-4">Disease Outbreak Tracking</h3>
              <div className="space-y-3">
                {diseaseAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900">{alert.name}</span>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: alert.color }} />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{alert.farms} farms affected</p>
                    <p className="text-xs text-gray-500">{alert.farmNames}</p>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-full text-red-600 border-red-300 hover:bg-red-50">
                Dispatch Support Team
              </Button>
            </Card>

            {/* Policy Implementation */}
            <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <Sprout className="w-8 h-8 mb-4" />
              <h3 className="text-white mb-2">Scheme Management</h3>
              <p className="text-sm text-green-100 mb-3">
                PM-KISAN, Crop Insurance & Subsidy disbursement
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <div className="text-xs text-green-100">Enrolled</div>
                  <div className="text-white">142</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <div className="text-xs text-green-100">Pending</div>
                  <div className="text-white">21</div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full rounded-full"
              >
                Manage Schemes
              </Button>
            </Card>

            {/* Farmer Communication */}
            <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <MessageSquare className="w-8 h-8 mb-4" />
              <h3 className="text-white mb-2">Mass Communication</h3>
              <p className="text-sm text-blue-100 mb-4">
                Send alerts, advisories & updates to all farmers
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full rounded-full"
              >
                Broadcast Message
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
