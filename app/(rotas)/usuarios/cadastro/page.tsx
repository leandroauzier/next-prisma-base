import UserForm from "@/features/usuarios/components/UserForm";
import { registerUser } from "@/features/usuarios/services/userService";
import { redirect } from "next/navigation";

export default function NewUserPage() {
  async function handleSubmit(data: any) {
    "use server";
    await registerUser(data);
    redirect("/users");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Cadastrar Usuário</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
