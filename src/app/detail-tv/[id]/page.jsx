"use server";

import DetailTv from "@/components/DetailTv";
import Header from "@/components/Header";
import { FetchData } from "@/libs/fetchData";

export default async function MovieDetailsPage({ params }) {
  const tvId = params.Id;
  const tvDetail = await FetchData({ uri: `tv/${tvId}` });
  const productionCompanies = tvDetail?.production_companies;

  return (
    <div className="h-fit flex flex-col items-center space-y-6 text-white">
      <Header />
      <DetailTv prodCom={productionCompanies} detailTv={tvDetail} />
    </div>
  );
}
