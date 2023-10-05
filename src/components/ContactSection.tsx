"use client";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import supabaseClient from "@/utils/supabaseClient";
import useActionsAuth from "@/store/actionHooks/useActionsAuth";
import { AccountType } from "@/store/auth";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactSection() {
  const [agreed, setAgreed] = useState(false);

  const { craeteAccount } = useActionsAuth();
  const [alluser, setAllUser] = useState<AccountType[]>([]);

  //  const {data:getAllUser} = await supabaseClient.from('User Details')
  //   .select()

  const getAlluser = async () => {
    const data = await supabaseClient.from("User Details").select();
    // console.log({getAllUser})
    if (data.data) {
      setAllUser(data.data);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (id) {
      const DeleteUser = await supabaseClient
        .from("User Details")
        .delete()
        .eq("id", id)
        .then((data) => {
          console.log({ data });
        });
      getAlluser();
    }
    // console.log({ DeleteUser });
  };

  useEffect(() => {
    getAlluser();
  }, []);

  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    dirty,
    isValid,
    isSubmitting,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      id: 0,
      first_name: "",
      last_name: "",
      company: "",
      email: "",
      phone: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      id: Yup.number().required("Required"),
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      company: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const input = {
        id: alluser.length,
        first_name: values.first_name,
        last_name: values.last_name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        description: values.description,
      };
      await supabaseClient
        .from("User Details")
        .insert([input])
        .select("id,first_name,last_name,company,email,phone,description")
        .then((data) => {
          {
            if (data.data) {
              console.log({ alluser });
              craeteAccount({ account: data.data[0], User: [] });
            }
          }
        });

      await supabaseClient
        .from("User Details")
        .select()
        .then((data) => {
          if (data.data) {
            setAllUser(data.data);
            craeteAccount({ User: data.data, account: data.data[0] });
          }
        });
      // console.log({getAllUser})
      //   setAllUser(data.data);
      // };
    },
  });

  // console.log({ getAllUser });
  console.log({ alluser });

  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  onBlur={handleBlur("first_name")}
                  value={values.first_name}
                  onChange={handleChange("first_name")}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last_name"
                  id="last-name"
                  onBlur={handleBlur("last_name")}
                  value={values.last_name}
                  onChange={handleChange("last_name")}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Company
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  onBlur={handleBlur("company")}
                  value={values.company}
                  onChange={handleChange("company")}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlur("email")}
                  value={values.email}
                  onChange={handleChange("email")}
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  onChange={handleChange("phone")}
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  onBlur={handleBlur("description")}
                  value={values.description}
                  onChange={handleChange("description")}
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => handleSubmit()}
              // disabled={false}
            >
              Lets talk
            </button>
          </div>
        </form>
      </div>

      <div className="isolate flex-1 bg-white px-6 py-24 sm:py-32 lg:px-8">
        {alluser &&
          alluser.map((data) => {
            return (
              <>
                <div className="border border-red-500 p-10 m-10">
                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      ID
                    </label>
                    :<p>{data.id}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    :<p>{data.first_name}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    :<p>{data.last_name}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    :<p>{data.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      company
                    </label>
                    :<p>{data.company}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    :<p>{data.phone}</p>
                  </div>

                  <div className="flex gap-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      description
                    </label>
                    :<p>{data.description}</p>
                  </div>

                  <div className="flex mt-5 gap-2">
                    <a
                      href="#"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit
                    </a>

                    <a
                      href="#"
                      className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => handleDeleteUser(data.id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
