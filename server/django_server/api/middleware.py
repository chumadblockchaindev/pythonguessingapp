from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


class SuspendedUserMiddleware(MiddlewareMixin):

    def init(self, get_response):
        self.get_response = get_response  # store the callable for later use

    def __call__(self, request):
        if request.user.is_authenticated and getattr(request.user, "is_suspended", False):
            return JsonResponse({'error': 'Your account has been suspended.'}, status=403)
        return self.get_response(request)
