import UserForm from "@/features/users/components/UserForm";
import { getUserById, updateUser } from "@/features/users/services/userService";
import { redirect } from "next/navigation";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  async function handleSubmit(data: any) {
    "use server";
    await updateUser(params.id, data);
    redirect("/users");
  }

  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Editar Usuário</h1>
      <UserForm
      initialData={{
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        telefone: user.telefone ?? "",
      }}
      onSubmit={handleSubmit} />
    </div>
  );
}
