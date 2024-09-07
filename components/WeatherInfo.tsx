type WeatherInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export default function WeatherInfo({ icon, label, value }: WeatherInfoProps) {
  return (
    <div className="flex items-center justify-center space-x-2 bg-indigo-50 p-3 rounded-lg">
      {icon}
      <div>
        <p className="text-sm text-indigo-600">{label}</p>
        <p className="font-semibold text-indigo-800">{value}</p>
      </div>
    </div>
  );
}
