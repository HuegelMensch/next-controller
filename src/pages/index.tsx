// pages/index.tsx

import CustomLineChart from "@/components/linechart";
import { map } from "lodash";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";

// Dynamically import the CustomLineChart to ensure it only loads on the client-side
interface IDevice {
  ip: string;
}
const Home: FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const add = (data) => {
    if (!devices.some((device) => device.ip === data.lastName)) {
      setDevices([...devices, { ip: data.lastName }]);
    }
  };
  console.log(devices);

  return (
    <main>
      <h1>Temperature Data</h1>

      {/* // use react hook form to create a form to add a new devide by ip address
          // use the ip address to call the loadData function */}
      <div>
        <form onSubmit={handleSubmit(add)}>
          <div className="flex flex-col w-28 gap-2">
            <input {...register("lastName", { required: true })} />
            {errors.lastName && <p>Last name is required.</p>}

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div>
        {map(devices, (device, index) => (
          <CustomLineChart key={index} ip={device.ip} />
        ))}
      </div>
    </main>
  );
};

export default Home;
