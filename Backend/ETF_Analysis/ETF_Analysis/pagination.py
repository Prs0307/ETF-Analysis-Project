from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class PaginationSize20(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    def get_paginated_response(self, data):
        return {
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "count": self.page.paginator.count,
            "limit": self.page_size,
            "current_page": self.page.number,
            "total_pages": self.page.paginator.num_pages,
            "results": data,
        }
    
class PaginationSize6(PageNumberPagination):
    page_size = 6
    page_size_query_param = "page_size"
    def get_paginated_response(self, data):
        return {
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "count": self.page.paginator.count,
            "limit": self.page_size,
            "current_page": self.page.number,
            "total_pages": self.page.paginator.num_pages,
            "results": data,
        }