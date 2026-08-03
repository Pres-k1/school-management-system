import React from 'react'

const Analytics = () => {
    return (
        <div>
            <aside
                className="w-[280px] h-screen fixed left-0 top-0 bg-[#0F172A] border-r border-outline-variant shadow-md flex flex-col h-full py-6 z-50 transition-all duration-200 ease-in-out"
            >
                <div className="px-6 mb-8">
                    <h1
                        className="font-headline-md text-headline-md font-bold text-white tracking-tight"
                    >
                        PSMS Uganda
                    </h1>
                    <p
                        className="text-on-surface-variant font-label-md text-label-md opacity-70"
                    >
                        Super Admin Portal
                    </p>
                </div>
                <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 space-y-1">

                    <a
                        className="flex items-center gap-3 px-4 py-3 border-l-4 border-tertiary-fixed bg-white/10 text-white font-bold rounded-r transition-all duration-200 ease-in-out"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="dashboard"
                        >dashboard</span
                        >
                        <span className="font-body-md text-body-md">Dashboard</span>
                    </a>

                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="how_to_reg"
                        >how_to_reg</span
                        >
                        <span className="font-body-md text-body-md">Admissions</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="school"
                        >school</span
                        >
                        <span className="font-body-md text-body-md">Students</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="supervisor_account"
                        >supervisor_account</span
                        >
                        <span className="font-body-md text-body-md">Teachers</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="family_restroom"
                        >family_restroom</span
                        >
                        <span className="font-body-md text-body-md">Parents</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="class">class</span>
                        <span className="font-body-md text-body-md">Classes</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="payments"
                        >payments</span
                        >
                        <span className="font-body-md text-body-md">School Fees</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined"
                            data-icon="account_balance_wallet"
                        >account_balance_wallet</span
                        >
                        <span className="font-body-md text-body-md">Finance</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-r"
                        href="#"
                    >
                        <span className="material-symbols-outlined" data-icon="local_library"
                        >local_library</span
                        >
                        <span className="font-body-md text-body-md">Library</span>
                    </a>
                </nav>
                <div className="mt-auto px-6 pt-6 border-t border-white/10 space-y-2">
                    <button
                        className="w-full bg-primary-container text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary-container/20"
                    >
                        <span className="material-symbols-outlined" data-icon="add">add</span>
                        <span>New Admission</span>
                    </button>
                    <div className="pt-4 space-y-1">
                        <a
                            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-white transition-colors"
                            href="#"
                        >
                            <span className="material-symbols-outlined" data-icon="settings"
                            >settings</span
                            >
                            <span className="font-label-md text-label-md">Settings</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-white transition-colors"
                            href="#"
                        >
                            <span className="material-symbols-outlined" data-icon="logout"
                            >logout</span
                            >
                            <span className="font-label-md text-label-md">Logout</span>
                        </a>
                    </div>
                </div>
            </aside>

            <header
                className="h-16 w-full fixed top-0 z-40 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm flex justify-between items-center pl-[280px] pr-8"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-full max-w-md">
                        <span
                            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                            data-icon="search"
                        >search</span
                        >
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary-container"
                            placeholder="Search students, teachers, or records..."
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="p-2 rounded-full hover:bg-surface-container-low cursor-pointer transition-colors relative"
                        >
                            <span
                                className="material-symbols-outlined text-on-surface-variant"
                                data-icon="notifications"
                            >notifications</span
                            >
                            <span
                                className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"
                            ></span>
                        </div>
                        <div
                            className="p-2 rounded-full hover:bg-surface-container-low cursor-pointer transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-on-surface-variant"
                                data-icon="help_outline"
                            >help_outline</span
                            >
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-outline-variant"></div>
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="text-right">
                            <p className="font-label-md text-label-md font-bold text-on-surface">
                                Head Teacher
                            </p>
                            <p
                                className="text-[10px] text-on-surface-variant uppercase tracking-wider"
                            >
                                Kampala Campus
                            </p>
                        </div>
                        <img
                            className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
                            data-alt="A professional headshot of a distinguished Ugandan head teacher wearing formal attire, with a warm and approachable expression. The background is a blurred office setting with bookshelves and certificates, emphasizing leadership and academic authority. Soft, natural lighting from a side window creates a classNameic, high-end portrait style."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0a9P-6kDt757svp14y3jFBDSN9oMjH2tFbh5KqTkLiKZqw5lDnIkz2ZQddLzOta11UFLC4Uu2Az6_yCtsWv9kNAHGbzd4hM-G5dmizkYwiQLUwP6DtqKcHPXnLgtPElYGsCLrK6cBaIfcLx2G6qmvJJgkCTAds3s9rGwvao6AnzUIG5u_v0e0EvAY79ftOi-J2GVUaw8tXEPeBmW1YsivhzIosdXx0xjHPPKA91I5kQe684x9OUniF3cKqs3pATJsbiyiTaJ0sM"
                        />
                    </div>
                </div>
            </header>


            <main className="pl-[280px] pt-16 min-h-screen">
                <div className="p-margin-desktop space-y-gutter">

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                Good morning, Head Teacher
                            </h2>
                            <p className="text-on-surface-variant font-body-lg text-body-lg">
                                Here's what's happening at PSMS Uganda today.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="px-4 py-2 bg-white border border-outline-variant text-on-surface font-bold rounded-lg flex items-center gap-2 hover:bg-surface-container-low transition-colors"
                            >
                                <span className="material-symbols-outlined" data-icon="download"
                                >download</span
                                >
                                <span>Daily Report</span>
                            </button>
                            <button
                                className="px-4 py-2 bg-primary-container text-white font-bold rounded-lg flex items-center gap-2 hover:bg-primary transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined" data-icon="bolt"
                                >bolt</span
                                >
                                <span>Quick Action</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">

                        <div
                            className="glass-card p-6 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p
                                    className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-1"
                                >
                                    Total Students
                                </p>
                                <h3 className="font-headline-lg text-headline-lg text-on-surface">
                                    2,450
                                </h3>
                                <div className="flex items-center gap-1 mt-2 text-primary">
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        data-icon="trending_up"
                                    >trending_up</span
                                    >
                                    <span className="font-label-md text-label-md"
                                    >+4.2% from last term</span
                                    >
                                </div>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <span
                                    className="material-symbols-outlined text-[32px]"
                                    data-icon="school"
                                >school</span
                                >
                            </div>
                        </div>

                        <div
                            className="glass-card p-6 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p
                                    className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-1"
                                >
                                    Total Teachers
                                </p>
                                <h3 className="font-headline-lg text-headline-lg text-on-surface">
                                    120
                                </h3>
                                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        data-icon="check_circle"
                                    >check_circle</span
                                    >
                                    <span className="font-label-md text-label-md"
                                    >98% present today</span
                                    >
                                </div>
                            </div>
                            <div
                                className="p-3 bg-tertiary-container/10 rounded-xl text-tertiary-container"
                            >
                                <span
                                    className="material-symbols-outlined text-[32px]"
                                    data-icon="supervisor_account"
                                >supervisor_account</span
                                >
                            </div>
                        </div>

                        <div
                            className="glass-card p-6 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p
                                    className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-1"
                                >
                                    Fees Collection
                                </p>
                                <h3 className="font-headline-lg text-headline-lg text-on-surface">
                                    UGX 450M
                                </h3>
                                <div className="flex items-center gap-1 mt-2 text-primary">
                                    <div
                                        className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden"
                                    >
                                        <div className="w-[75%] h-full bg-primary-container"></div>
                                    </div>
                                    <span className="font-label-md text-label-md">75% of target</span>
                                </div>
                            </div>
                            <div
                                className="p-3 bg-secondary-container/10 rounded-xl text-secondary-container"
                            >
                                <span
                                    className="material-symbols-outlined text-[32px]"
                                    data-icon="payments"
                                >payments</span
                                >
                            </div>
                        </div>

                        <div
                            className="glass-card p-6 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p
                                    className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-1"
                                >
                                    Active Courses
                                </p>
                                <h3 className="font-headline-lg text-headline-lg text-on-surface">
                                    48
                                </h3>
                                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        data-icon="schema"
                                    >schema</span
                                    >
                                    <span className="font-label-md text-label-md"
                                    >Across 6 streams</span
                                    >
                                </div>
                            </div>
                            <div
                                className="p-3 bg-on-tertiary-fixed-variant/10 rounded-xl text-on-tertiary-fixed-variant"
                            >
                                <span
                                    className="material-symbols-outlined text-[32px]"
                                    data-icon="menu_book"
                                >menu_book</span
                                >
                            </div>
                        </div>
                    </div>

                    <div className="bento-grid">

                        <div
                            className="col-span-12 lg:col-span-8 glass-card p-6 min-h-[400px] flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h4 className="font-title-lg text-title-lg text-on-surface">
                                        Student Enrollment Trends
                                    </h4>
                                    <p className="text-on-surface-variant font-label-md text-label-md">
                                        Academic Year 2023-2024
                                    </p>
                                </div>
                                <select
                                    className="bg-surface-container-low border-none text-label-md rounded-lg focus:ring-primary-container"
                                >
                                    <option>Last 6 Months</option>
                                    <option>Full Year</option>
                                </select>
                            </div>

                            <div
                                className="flex-1 relative chart-gradient rounded-xl border border-dashed border-primary/20 flex items-center justify-center overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 flex items-end justify-between px-6 pb-4"
                                >
                                    <div
                                        className="w-[12%] h-[40%] bg-primary-container/20 rounded-t-lg"
                                    ></div>
                                    <div
                                        className="w-[12%] h-[60%] bg-primary-container/30 rounded-t-lg"
                                    ></div>
                                    <div
                                        className="w-[12%] h-[55%] bg-primary-container/40 rounded-t-lg"
                                    ></div>
                                    <div
                                        className="w-[12%] h-[80%] bg-primary-container/50 rounded-t-lg"
                                    ></div>
                                    <div
                                        className="w-[12%] h-[70%] bg-primary-container/60 rounded-t-lg"
                                    ></div>
                                    <div
                                        className="w-[12%] h-[90%] bg-primary-container rounded-t-lg shadow-lg"
                                    ></div>
                                </div>
                                <p className="text-primary font-bold z-10 flex items-center gap-2">
                                    <span className="material-symbols-outlined" data-icon="analytics"
                                    >analytics</span
                                    >
                                    Interactive Chart Visualization
                                </p>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 glass-card p-6 flex flex-col">
                            <h4 className="font-title-lg text-title-lg text-on-surface mb-1">
                                Fees Collection Status
                            </h4>
                            <p className="text-on-surface-variant font-label-md text-label-md mb-8">
                                Current Term Progress
                            </p>
                            <div className="flex-1 flex flex-col items-center justify-center gap-6">
                                <div
                                    className="relative w-48 h-48 rounded-full border-[16px] border-surface-container flex items-center justify-center"
                                >
                                    <div
                                        className="absolute inset-[-16px] w-48 h-48 rounded-full border-[16px] border-primary-container border-t-transparent border-r-transparent rotate-45"
                                    ></div>
                                    <div className="text-center">
                                        <p
                                            className="font-headline-lg text-headline-lg text-on-surface leading-none"
                                        >
                                            75%
                                        </p>
                                        <p
                                            className="font-label-md text-label-md text-on-surface-variant"
                                        >
                                            Paid
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between items-center text-body-md">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full bg-primary-container"
                                            ></div>
                                            <span>Fully Paid</span>
                                        </div>
                                        <span className="font-bold">1,837</span>
                                    </div>
                                    <div className="flex justify-between items-center text-body-md">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full bg-tertiary-container"
                                            ></div>
                                            <span>Partial</span>
                                        </div>
                                        <span className="font-bold">412</span>
                                    </div>
                                    <div className="flex justify-between items-center text-body-md">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-error"></div>
                                            <span>Not Paid</span>
                                        </div>
                                        <span className="font-bold">201</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-7 glass-card p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-title-lg text-title-lg text-on-surface">
                                    Recent Activities
                                </h4>
                                <button
                                    className="text-primary font-bold font-label-md text-label-md hover:underline"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="space-y-6">

                                <div className="flex gap-4 group cursor-pointer">
                                    <div
                                        className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined" data-icon="person_add"
                                        >person_add</span
                                        >
                                    </div>
                                    <div className="flex-1 border-b border-outline-variant pb-4">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-on-surface">
                                                New Student Admission
                                            </p>
                                            <span
                                                className="text-on-surface-variant font-label-md text-label-md"
                                            >10 mins ago</span
                                            >
                                        </div>
                                        <p className="text-body-md text-on-surface-variant">
                                            Jjuuko Akram was admitted to Primary 4 Stream B.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group cursor-pointer">
                                    <div
                                        className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined" data-icon="payments"
                                        >payments</span
                                        >
                                    </div>
                                    <div className="flex-1 border-b border-outline-variant pb-4">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-on-surface">Recent Fee Payment</p>
                                            <span
                                                className="text-on-surface-variant font-label-md text-label-md"
                                            >25 mins ago</span
                                            >
                                        </div>
                                        <p className="text-body-md text-on-surface-variant">
                                            Sarah N. paid UGX 1,200,000 for Term II fees.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group cursor-pointer">
                                    <div
                                        className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error"
                                    >
                                        <span className="material-symbols-outlined" data-icon="warning"
                                        >warning</span
                                        >
                                    </div>
                                    <div className="flex-1 border-b border-outline-variant pb-4">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-on-surface">
                                                Teacher Attendance Alert
                                            </p>
                                            <span
                                                className="text-on-surface-variant font-label-md text-label-md"
                                            >1 hour ago</span
                                            >
                                        </div>
                                        <p className="text-body-md text-on-surface-variant">
                                            Mr. Okello (Math) has not checked in for the first period.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-5 glass-card p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-title-lg text-title-lg text-on-surface">
                                    Upcoming Events
                                </h4>
                                <button
                                    className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                                >
                                    <span
                                        className="material-symbols-outlined text-on-surface-variant"
                                        data-icon="calendar_month"
                                    >calendar_month</span
                                    >
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div
                                    className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4"
                                >
                                    <div
                                        className="flex flex-col items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm border border-outline-variant min-w-[70px]"
                                    >
                                        <span
                                            className="text-[10px] uppercase font-bold text-on-surface-variant"
                                        >May</span
                                        >
                                        <span className="text-headline-md font-bold text-primary"
                                        >22</span
                                        >
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-on-surface">
                                            Term II Opening Ceremony
                                        </p>
                                        <p className="text-body-md text-on-surface-variant">
                                            08:00 AM - School Grounds
                                        </p>
                                        <div className="flex -space-x-2 mt-3">
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-white bg-surface-dim"
                                            ></div>
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-high"
                                            ></div>
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-white bg-primary-fixed-dim"
                                            ></div>
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-lowest flex items-center justify-center text-[10px] font-bold text-on-surface-variant"
                                            >
                                                +12
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-container-low flex gap-4">
                                    <div
                                        className="flex flex-col items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm border border-outline-variant min-w-[70px]"
                                    >
                                        <span
                                            className="text-[10px] uppercase font-bold text-on-surface-variant"
                                        >May</span
                                        >
                                        <span className="text-headline-md font-bold text-on-surface"
                                        >25</span
                                        >
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-on-surface">Staff Meeting</p>
                                        <p className="text-body-md text-on-surface-variant">
                                            03:30 PM - Main Hall
                                        </p>
                                        <p
                                            className="mt-2 text-primary font-label-md text-label-md flex items-center gap-1"
                                        >
                                            <span
                                                className="material-symbols-outlined text-[16px]"
                                                data-icon="location_on"
                                            >location_on</span
                                            >
                                            Block A, Room 302
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-low transition-all"
                                >
                                    + Add New Event
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div
                            className="bg-surface-container-low px-6 py-4 flex justify-between items-center border-b border-outline-variant"
                        >
                            <h4 className="font-title-lg text-title-lg text-on-surface">
                                Facility Status
                            </h4>
                            <span
                                className="px-3 py-1 bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant text-[12px] font-bold rounded-full"
                            >All Systems Normal</span
                            >
                        </div>
                        <div
                            className="grid grid-cols-1 md:grid-cols-3 divide-x divide-outline-variant"
                        >
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="directions_bus"
                                    >directions_bus</span
                                    >
                                    <span className="font-bold">Transport</span>
                                </div>
                                <p className="text-headline-md font-bold text-on-surface">12 / 14</p>
                                <p className="text-body-md text-on-surface-variant">
                                    Buses currently on routes.
                                </p>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span className="material-symbols-outlined" data-icon="hotel"
                                    >hotel</span
                                    >
                                    <span className="font-bold">Hostel Capacity</span>
                                </div>
                                <p className="text-headline-md font-bold text-on-surface">88%</p>
                                <p className="text-body-md text-on-surface-variant">
                                    42 spaces available.
                                </p>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="local_library"
                                    >local_library</span
                                    >
                                    <span className="font-bold">Library Activity</span>
                                </div>
                                <p className="text-headline-md font-bold text-on-surface">156</p>
                                <p className="text-body-md text-on-surface-variant">
                                    Books checked out today.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Analytics
