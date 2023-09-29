import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Transaction({ auth, asset }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        asset_id: asset.id,
        amount: '',
        type: '',
        method: '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('assets.update', asset.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Transaction</h2>}
        >
            <Head title="Create Transaction" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Create New Transaction</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create A New Transaction.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="amount" value="Amount" />

                                    <TextInput
                                        id="amount"
                                        className="mt-1 block w-full"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="amount"
                                    />

                                    <InputError className="mt-2" message={errors.amount} />
                                </div>

                                <div>
                                    <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Type</label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        id="type"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Select an option</option>
                                            <option value="Credit">Credit</option>
                                            <option value="Debit">Debit</option>
                                    </select>
                                </div>

                                <div>
                                    <label for="method" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
                                    <select
                                        value={data.method}
                                        onChange={(e) => setData('method', e.target.value)}
                                        id="type"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Select an option</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="Card">Card</option>
                                            <option value="POS">POS</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
