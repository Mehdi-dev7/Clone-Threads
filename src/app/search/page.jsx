import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";

export default function Search() {
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto w-full">
        {/* Search */}
        <form>
          <input type="search" placeholder="Rechercher" className="input" />
        </form>

        {/* Results */}
        <div className="mt-32 text-center text-threads-gray-light">
          Rechercher des profils à decouvrir
        </div>
      </div>

    </ConnectedLayout>
  )
}