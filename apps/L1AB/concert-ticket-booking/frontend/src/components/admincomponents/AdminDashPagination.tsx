import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
   
   
  } from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight,} from "lucide-react"


  export const AdminPagination=()=>{
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
          <PaginationLink className="border rounded mr-6" href="#"><ChevronLeft/></PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="border rounded " href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="border rounded " href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="border rounded mr-6 " href="#"><ChevronRight/></PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
