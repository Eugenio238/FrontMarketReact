import { useEffect, useState } from 'react';
// permet de rediriger l’utilisateur vers une autre page
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// UI components (Button, Card, Badge…) → proviennent probablement de shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// gère la récupération de l’utilisateur connecté
import { authService } from '@/services/auth';
// type User défini dans src/types.ts
import { User } from '@/types';
// lucide-react fournit des icônes modernes
import { 
  Store, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  ShoppingBag, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Home = () => {

  // A quoi sert UseState ici ?
  // Sert à gérer l’état d’une variable dans un composant React.
  // Retourne un tableau de 2 éléments :
  // La valeur courante (lecture).
  // La fonction qui permet de modifier cette valeur (écriture).
  // On peut initialiser la variable directement en passant une valeur à useState()
  // On peut l'utiliser sur Compteur, formulaire, toggle (true/false), données locales
  // Gestion de l’état utilisateur , On stocke l’utilisateur connecté dans user
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // A quoi sert UseEffect ici ?
  // C’est un hook pour gérer les effets secondaires dans un composant React.
  // Un effet secondaire = du code qui agit en dehors du rendu “pur” (par exemple : appels API, timers, manipulation du DOM, événements…).
  // Au chargement (useEffect), on demande à authService l’utilisateur actuel et on l’enregistre
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleGetStarted = () => {
    // Si un utilisateur est connecté et qu’il est vendeur → redirection vers le dashboard.
    // Sinon → redirection vers la page authentification.
    if (user) {
      if (user.type === 'vendeur') {
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <Store className="h-16 w-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">
                MarketPlace
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              La plateforme moderne pour vendre vos produits en ligne. 
              Simple, rapide et efficace avec contact direct WhatsApp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Au click de se bouton on execute la focntion handleGetStarted */}
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
                onClick={handleGetStarted}
              >
                <Store className="h-5 w-5 mr-2" />
                Commencer à vendre
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                <Users className="h-5 w-5 mr-2" />
                Découvrir les boutiques
              </Button>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-white/80">Produits vendus</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Vendeurs actifs</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Support WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi choisir MarketPlace ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une solution complète pour développer votre business en ligne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pour les Vendeurs */}
            <Card className="animate-scale-in shadow-lg hover:shadow-glow transition-shadow">
              <CardHeader>
                <Store className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Dashboard Vendeur</CardTitle>
                <CardDescription>
                  Gérez facilement tous vos produits depuis un seul endroit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Ajout/modification de produits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Statistiques en temps réel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Lien boutique personnalisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Gestion des ventes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in shadow-lg hover:shadow-glow transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Contact WhatsApp</CardTitle>
                <CardDescription>
                  Communication directe entre acheteurs et vendeurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Contact instantané</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Négociation en direct</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Suivi des intérêts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Messages pré-remplis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in shadow-lg hover:shadow-glow transition-shadow" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Analytics Avancées</CardTitle>
                <CardDescription>
                  Suivez vos performances et optimisez vos ventes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Vues par produit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Clics sur lien boutique</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Produits les plus demandés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Revenus calculés</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Abonnements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plans d'abonnement vendeur
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez le plan qui correspond à votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Journalier */}
            <Card className="animate-fade-in-up border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Journalier</CardTitle>
                <CardDescription>Parfait pour commencer</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">
                  500 FCFA
                  <span className="text-base text-muted-foreground font-normal">/jour</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">25 produits/jour</div>
                  <div className="text-sm text-muted-foreground">Renouvelé chaque jour</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Dashboard complet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Boutique publique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Statistiques de base</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Hebdomadaire */}
            <Card className="animate-fade-in-up border-2 border-primary shadow-glow relative" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <Badge className="bg-primary text-white px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              </div>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/20 rounded-full w-fit">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Hebdomadaire</CardTitle>
                <CardDescription>Idéal pour la croissance</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">
                  1000 FCFA
                  <span className="text-base text-muted-foreground font-normal">/semaine</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">200 produits/semaine</div>
                  <div className="text-sm text-muted-foreground">~28 produits/jour</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Toutes les fonctionnalités</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Analytics avancées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support prioritaire</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Mensuel */}
            <Card className="animate-fade-in-up border-2 hover:border-primary/50 transition-colors" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Mensuel</CardTitle>
                <CardDescription>Pour les professionnels</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">
                  5000 FCFA
                  <span className="text-base text-muted-foreground font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">150 produits/jour</div>
                  <div className="text-sm text-muted-foreground">~4500 produits/mois</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Capacité maximale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Analytics premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support dédié</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Paiement sécurisé via Mobile Money au +22997912189
            </p>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Choisir mon plan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à développer votre business ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez des centaines de vendeurs qui font confiance à MarketPlace
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              onClick={handleGetStarted}
            >
              <Store className="h-5 w-5 mr-2" />
              Créer ma boutique gratuitement
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-white/70 mt-4">
              Aucun engagement • Configuration en 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Store className="h-8 w-8 text-primary mr-3" />
              <span className="text-2xl font-bold">MarketPlace</span>
            </div>
            <p className="text-muted-foreground mb-6">
              La plateforme moderne pour vendre en ligne au Bénin
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 MarketPlace</span>
              <span>•</span>
              <span>Support: +22997912189</span>
              <span>•</span>
              <span>WhatsApp Business</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;