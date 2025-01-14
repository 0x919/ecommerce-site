import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          Navo Store
        </Link>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered h-10 w-24 md:w-auto" />
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="">Subtotal: $80</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-bock">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
