from rest_framework.permissions import BasePermission


class IsAdminUserOnly(BasePermission):
    """ Allows access only to admin users. """

    def has_permission(self, request, view):
        return request.user and request.user.is_staff
