"use server";

import Detail from "@/components/Detail";
import Header from "@/components/Header";
import { FetchData } from "@/libs/fetchData";

export default async function MovieDetailsPage({ params }) {
  const movieId = params.Id;
  const movDetail = await FetchData({ uri: `movie/${movieId}` });
  const productionCompanies = movDetail?.production_companies;

  return (
    <div className="h-fit flex flex-col items-center space-y-6 text-white">
      <Header />
      <Detail prodCom={productionCompanies} detailMov={movDetail} />
    </div>
  );
}
