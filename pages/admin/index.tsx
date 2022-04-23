import dynamic from "next/dynamic";

const NetlifyCMS = dynamic(() => import("../../components/admin"), {
  ssr: false,
});

function AdminPage() {
  return <NetlifyCMS />;
}

export default AdminPage;
