import Image from "next/image"

export const EmptyFavorites = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/empty-favorites.png" height={140} width={140} alt="empty"/>
            <h2 className="text-2xl font-semibold mt-6"> 즐겨찾기가 비어있습니다 </h2>
            <p className="text-muted-foreground text-sm mt-2">
                다이어리를 즐겨찾기에 등록해보세요
            </p>
        </div>
    )
}